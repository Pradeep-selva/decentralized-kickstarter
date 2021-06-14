import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  Confirm,
  Input,
  TextArea,
  Icon,
  Segment
} from "semantic-ui-react";
import { Layout, StatusIndicator } from "../components";
import styles from "../styles/Pages.module.css";
import { useValidateNewCampaign } from "../validators";
import { CampaignErrors, CampaignPayload } from "../types/validators";
import { Factory, web3 } from "../instances";
import RouteNames from "../routes";

type IState = {
  errors: CampaignErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  contribution: string;
  failMessage: string;
};

class ContributionForm extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showConfirm: false,
      showStatus: false,
      errors: null,
      failMessage: "",
      contribution: ""
    };
  }

  handleSubmit = async () => {
    const { contribution } = this.state;
    //   const [payload, errors] = useValidateContributionForm(values);

    //   if (!!errors) this.setState({ errors });
    //   else {
    //     this.toggleLoading();
    //     const { description, minContribution, title, image } = payload;
    //     this.setState({ showStatus: true });

    //     let accounts;

    //     try {
    //       accounts = await web3.eth.getAccounts();

    //       await Factory.methods
    //         .createCampaign(minContribution, title, description, image)
    //         ?.send({ from: accounts[0] });

    //       this.setState({
    //         contribution: "",
    //         errors: null,
    //         failMessage: ""
    //       });
    //     } catch (err) {
    //       this.setState({
    //         failMessage: !!accounts.length
    //           ? err.message
    //           : "Transaction failed! Make sure you have metamask installed to make a transaction.",
    //         errors: null
    //       });
    //     } finally {
    //       this.toggleLoading();
    //       setTimeout(() => {
    //         this.setState({ showStatus: false });
    //       }, 5000);
    //     }
    //   }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  closeDialog = () => this.setState(() => ({ showConfirm: false }));

  render() {
    const {
      contribution,
      errors,
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
            success={"Your campaign was successfully created!"}
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
            <p className={styles.error}>{errors?.minContribution}</p>
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
