import React, { Component } from "react";
import Head from "next/head";
import { Container, Form, Input, Button, TextArea } from "semantic-ui-react";
import styles from "../../../../styles/Pages.module.css";
import { Layout, StatusIndicator } from "../../../../components";
import { RequestErrors, RequestPayload } from "../../../../types";

type IState = {
  errors: RequestErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  values: RequestPayload;
  failMessage: string;
};

const defaultValues: RequestPayload = {
  description: "",
  recipient: "",
  value: ""
};

interface IProps {
  address: string;
}

class NewRequest extends Component<IProps, IState> {
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

  static async getInitialProps(context) {
    const address = context.query.campaign;

    return { address };
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

  render() {
    const { address } = this.props;
    const { errors, failMessage, loading, showStatus, values } = this.state;

    return (
      <div>
        <Head>
          <title>D K: New Request for {address}</title>
          <meta
            name='description'
            content={`Decentralized KickStarter - New request for campaign ${address}`}
          />
        </Head>
        <main>
          <Layout>
            <Container>
              <h1 className={styles.heading}>New Request</h1>
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
                  <label>Value to Transfer</label>
                  <Input
                    label={"wei"}
                    labelPosition={"right"}
                    value={values.value}
                    type={"number"}
                    name={"minContribution"}
                    onChange={this.handleChange}
                  />
                  <p className={styles.error}>{errors?.value}</p>
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
                  <label>Recipient address</label>
                  <Input
                    value={values.recipient}
                    name={"image"}
                    onChange={this.handleChange}
                  />
                  <p className={styles.error}>{errors?.recipient}</p>
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
        </main>
      </div>
    );
  }
}

export default NewRequest;
