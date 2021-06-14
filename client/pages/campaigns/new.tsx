import React, { Component } from "react";
import { Container, Form, Button, Confirm } from "semantic-ui-react";
import { Layout, StatusIndicator } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { useValidateNewCampaign } from "../../validators";
import { CampaignErrors, CampaignPayload } from "../../types/validators";
import { Factory, web3 } from "../../instances";

type IState = {
  errors: CampaignErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  values: CampaignPayload;
};

const defaultValues: CampaignPayload = {
  description: "",
  minContribution: "0",
  title: ""
};

class NewCampaign extends Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showConfirm: false,
      showStatus: false,
      errors: null,
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
      const { description, minContribution, title } = payload;
      this.setState({ showStatus: true });

      try {
        const accounts = await web3.eth.getAccounts();

        await Factory.methods
          .createCampaign(minContribution, title, description)
          ?.send({ from: accounts[0] });

        this.setState({
          values: { ...defaultValues },
          errors: null
        });
      } catch (err) {
        console.log(err);
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
    const { values, errors, showConfirm, loading, showStatus } = this.state;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            {showStatus && (
              <StatusIndicator
                status={
                  loading
                    ? "waiting"
                    : !!errors || !!values.title.length
                    ? "error"
                    : "success"
                }
                error={
                  "An error occurred while creating campaign. Do you have metamask installed?"
                }
                success={"Your campaign was successfully created!"}
              />
            )}
            <Form onSubmit={() => this.setState({ showConfirm: true })}>
              <Form.Field>
                <label>Minimum Contribution (wei)</label>
                <input
                  value={values.minContribution}
                  type={"number"}
                  name={"minContribution"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.minContribution}</p>
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <input
                  value={values.title}
                  name={"title"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.title}</p>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea
                  value={values.description}
                  name={"description"}
                  maxLength={1000}
                  rows={5}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors?.description}</p>
              </Form.Field>
              <Button
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

export default NewCampaign;
