import React, { Component } from "react";
import { Form, Button, Confirm, Input } from "semantic-ui-react";
import { StatusIndicator } from "../components";
import styles from "../styles/Pages.module.css";
import { useValidateContribution } from "../validators";
import { Campaign, web3 } from "../instances";

type IState = {
  error: string | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  contribution: string;
  failMessage: string;
};

interface IProps {
  minContribution: string;
  address: string;
  callback: Function;
}

class ContributionForm extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showConfirm: false,
      showStatus: false,
      error: null,
      failMessage: "",
      contribution: ""
    };
  }

  handleSubmit = async () => {
    const { contribution } = this.state;
    const [payload, error] = useValidateContribution(
      contribution,
      this.props.minContribution
    );

    if (!!error) this.setState({ error });
    else {
      this.toggleLoading();
      this.setState({ showStatus: true });

      let accounts;

      try {
        accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);

        await campaign.methods.contribute()?.send({
          from: accounts[0],
          value: payload
        });

        this.props.callback(payload);

        this.setState({
          contribution: "",
          error: null,
          failMessage: ""
        });
      } catch (err) {
        this.setState({
          failMessage: !!accounts.length
            ? err.message.includes("MetaMask")
              ? err.message
              : "Transaction failed! You are an existing contributor"
            : "Transaction failed! Make sure you have metamask installed to make a transaction.",
          error: null
        });
      } finally {
        this.toggleLoading();
        setTimeout(() => {
          this.setState({ showStatus: false });
        }, 5000);
      }
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  closeDialog = () => this.setState(() => ({ showConfirm: false }));

  render() {
    const {
      contribution,
      error,
      showConfirm,
      loading,
      showStatus,
      failMessage
    } = this.state;

    return (
      <div className={styles.centerContainer}>
        <h2 style={{ textAlign: "center" }}>Want to become a contributor?</h2>
        {showStatus && (
          <StatusIndicator
            status={
              loading ? "waiting" : !!failMessage.length ? "error" : "success"
            }
            error={failMessage}
            success={"Your are now a contributor!"}
          />
        )}
        <Form onSubmit={() => this.setState({ showConfirm: true })}>
          <Form.Field>
            <label>Contribution</label>
            <Input
              label={"wei"}
              labelPosition={"right"}
              value={contribution}
              type={"number"}
              name={"minContribution"}
              onChange={({ target: { value } }) =>
                this.setState({ contribution: value })
              }
            />
            <p className={styles.error}>{error}</p>
          </Form.Field>
          <Button
            loading={loading}
            disabled={loading}
            size={"small"}
            color={"blue"}
            type={"submit"}
          >
            Contribute
          </Button>
        </Form>
        <Confirm
          open={showConfirm}
          content={`Are you sure you want to pay ${contribution} wei to contribute?`}
          onCancel={this.closeDialog}
          onConfirm={() => {
            this.closeDialog();
            this.handleSubmit();
          }}
        />
      </div>
    );
  }
}

export default ContributionForm;
