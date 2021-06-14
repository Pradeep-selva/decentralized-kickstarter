import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  Confirm,
  Input,
  TextArea,
  Icon
} from "semantic-ui-react";
import { NextRouter, withRouter } from "next/router";
import { Layout, StatusIndicator } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { useValidateNewCampaign } from "../../validators";
import { CampaignErrors, CampaignPayload } from "../../types/validators";
import { Factory, web3 } from "../../instances";
import RouteNames from "../../routes";

type IState = {
  errors: CampaignErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  values: CampaignPayload;
  failMessage: string;
};

const defaultValues: CampaignPayload = {
  description: "",
  minContribution: "0",
  title: "",
  image: ""
};

interface IProps {
  router: NextRouter;
}

class NewCampaign extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showConfirm: false,
      showStatus: false,
      errors: null,
      failMessage: "",
      values: {
        ...defaultValues
      }
    };
  }

  handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    this.setState((state) => ({
      values: {
        ...state.values,
        [event.target.name]: event.target.value
      }
    }));

  handleSubmit = async () => {
    const { values } = this.state;
    const [payload, errors] = useValidateNewCampaign(values);

    if (!!errors) this.setState({ errors });
    else {
      this.toggleLoading();
      const { description, minContribution, title, image } = payload;
      this.setState({ showStatus: true });

      let accounts;

      try {
        accounts = await web3.eth.getAccounts();

        await Factory.methods
          .createCampaign(minContribution, title, description, image)
          ?.send({ from: accounts[0] });

        this.setState({
          values: { ...defaultValues },
          errors: null,
          failMessage: ""
        });
      } catch (err) {
        this.setState({
          failMessage: !!accounts.length
            ? err.message
            : "Transaction failed! Make sure you have metamask installed to make a transaction.",
          errors: null
        });
      } finally {
        this.toggleLoading();
        setTimeout(() => {
          this.setState({ showStatus: false });
          !this.state.failMessage.length &&
            this.props.router.push(RouteNames.home);
        }, 5000);
      }
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  closeDialog = () => this.setState(() => ({ showConfirm: false }));

  render() {
    const { values, errors, showConfirm, loading, showStatus, failMessage } =
      this.state;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container>
            <h1 className={styles.heading}>
              <Icon name={"ticket"} /> Create Campaign
            </h1>
            {showStatus && (
              <StatusIndicator
                icon
                status={
                  loading
                    ? "waiting"
                    : !!failMessage.length
                    ? "error"
                    : "success"
                }
                error={failMessage}
                success={"Your campaign was successfully created!"}
              />
            )}
            <Form onSubmit={() => this.setState({ showConfirm: true })}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                  label={"wei"}
                  labelPosition={"right"}
                  value={values.minContribution}
                  type={"number"}
                  name={"minContribution"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.minContribution}</p>
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <Input
                  value={values.title}
                  name={"title"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.title}</p>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea
                  value={values.description}
                  name={"description"}
                  maxLength={1000}
                  rows={5}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.description}</p>
              </Form.Field>
              <Form.Field>
                <label>Image Link</label>
                <Input
                  value={values.image}
                  name={"image"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.image}</p>
              </Form.Field>
              <Button
                loading={loading}
                disabled={loading}
                size={"huge"}
                color={"blue"}
                type={"submit"}
              >
                Create
              </Button>
            </Form>
          </Container>
        </Layout>
        <Confirm
          content={"Are you sure you want to create this campaign?"}
          open={showConfirm}
          onCancel={this.closeDialog}
          onConfirm={() => {
            this.closeDialog();
            this.handleSubmit();
          }}
        />
      </main>
    );
  }
}

export default withRouter(NewCampaign);
