import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { Layout } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { useValidateNewCampaign } from "../../validators";
import { CampaignErrors, CampaignPayload } from "../../types/validators";

type IState = {
  message: string;
  errors: CampaignErrors;
  loading: boolean;
  values: CampaignPayload;
};

class NewCampaign extends Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      loading: false,
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

  handleSubmit = () => {
    const { values } = this.state;
    const [payload, errors] = useValidateNewCampaign(values);

    if (!!Object.keys(errors).length) this.setState({ errors });
    else {
      this.toggleLoading();
      this.setState({ message: "Waiting for transaction confirmation..." });
      console.log(payload);
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { values, errors } = this.state;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            <Form onSubmit={this.handleSubmit}>
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
              <Button size={"huge"} color={"blue"} type={"submit"}>
                Create
              </Button>
            </Form>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default NewCampaign;
