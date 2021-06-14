import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { Layout } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { useValidateNewCampaign } from "../../validators";

type IState = {
  minContribution: string;
  title: string;
  description: string;
} & { [x: string]: string };

class NewCampaign extends Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      minContribution: "",
      title: ""
    };
  }

  handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    this.setState({
      [event.target.name]: event.target.value
    });

  handleSubmit = () => {
    const { description, minContribution, title } = this.state;
    const [payload, errors] = useValidateNewCampaign({
      description,
      minContribution,
      title
    });

    console.log(payload, errors);
  };

  render() {
    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Minimum Contribution (wei)</label>
                <input
                  type={"number"}
                  name={"minContribution"}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <input name={"title"} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea
                  name={"description"}
                  maxLength={1000}
                  rows={5}
                  onChange={this.handleChange}
                />
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
