import React, { Component } from "react";
import { Container, Form, Button, Confirm, Message } from "semantic-ui-react";
import { Layout } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { useValidateNewCampaign } from "../../validators";
import { CampaignErrors, CampaignPayload } from "../../types/validators";
import { Factory, web3 } from "../../instances";

type IState = {
  message: string;
  errors: CampaignErrors;
  loading: boolean;
  showConfirm: boolean;
  values: CampaignPayload;
};

class NewCampaign extends Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      loading: false,
      showConfirm: false,
      errors: {},
      values: {
        description: "",
        minContribution: "",
        title: ""
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
      this.setState({ message: "Waiting for transaction confirmation..." });

      const { description, minContribution, title } = payload;

      try {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await Factory.methods
          .createCampaign(minContribution, title, description)
          ?.send({ from: accounts[0] });
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ message: "" });
        this.toggleLoading();
      }
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { values, errors, showConfirm, loading } = this.state;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            <Form onSubmit={() => this.setState({ showConfirm: true })}>
              <Form.Field>
                <label>Minimum Contribution (wei)</label>
                <input
                  value={values.minContribution}
                  type={"number"}
                  name={"minContribution"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors.minContribution}</p>
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <input
                  value={values.title}
                  name={"title"}
                  onChange={this.handleChange}
                />
                <p className={styles.error}>{errors.title}</p>
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
                <p className={styles.error}>{errors.description}</p>
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
          onCancel={() => this.setState({ showConfirm: false })}
          onConfirm={this.handleSubmit}
        />
      </main>
    );
  }
}

export default NewCampaign;
