import React, { Component } from "react";
import Head from "next/head";
import {
  Container,
  Form,
  Input,
  Button,
  TextArea,
  Confirm
} from "semantic-ui-react";
import Link from "next/link";
import styles from "../../../../styles/Pages.module.css";
import homeStyles from "../../../../styles/Home.module.css";
import { StatusIndicator } from "../../../../components";
import { NewRequestState, RequestPayload, RouterProp } from "../../../../types";
import { useValidateNewRequest } from "../../../../validators";
import { web3 } from "../../../../instances";
import { createRequest } from "../../../../utils";
import { withRouter } from "next/router";
import { RouteNames } from "../../../../config";

const defaultValues: RequestPayload = {
  description: "",
  recipient: "",
  value: ""
};

type IProps = RouterProp & { address: string };

class NewRequest extends Component<IProps, NewRequestState> {
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

  handleSubmit = async () => {
    const { values } = this.state;
    const [payload, errors] = useValidateNewRequest(values);

    if (!!errors) this.setState({ errors });
    else {
      this.toggleLoading();
      this.setState({ showStatus: true, errors: {} });

      const accounts = await web3.eth.getAccounts();
      const err = await createRequest(this.props.address, accounts[0], payload);

      if (err) {
        this.setState({
          failMessage: !!accounts.length
            ? err.message
            : "Transaction failed! Make sure you have metamask installed to make a transaction.",
          errors: null
        });
      } else {
        this.setState({
          values: { ...defaultValues },
          errors: null,
          failMessage: ""
        });
      }

      this.toggleLoading();
      setTimeout(() => {
        this.setState({ showStatus: false });
        !this.state.failMessage.length &&
          this.props.router.push(
            RouteNames.requestsByCampaign.as(this.props.address)
          );
      }, 5000);
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  closeDialog = () => this.setState(() => ({ showConfirm: false }));

  render() {
    const { address } = this.props;
    const { errors, failMessage, loading, showStatus, values, showConfirm } =
      this.state;

    return (
      <div>
        <Head>
          <title>D K: New Request for {address}</title>
          <meta
            name='description'
            content={`Create a new request for campaign ${address}`}
          />
          <meta property='og:site_name' content='Decentralized KickStarter' />
          <meta
            property='og:description'
            content={`Create a new request for campaign ${address}`}
          />
          <meta property='og:title' content='Create Request' />
        </Head>
        <main className={homeStyles.main}>
          <Container>
            <Link
              href={RouteNames.requestsByCampaign.absolute}
              as={RouteNames.requestsByCampaign.as(address)}
            >
              <Button
                icon={"arrow alternate circle left"}
                floated={"left"}
                size={"massive"}
                primary
                circular
              />
            </Link>
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
                success={"Your request was successfully created!"}
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
                  name={"value"}
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
                  name={"recipient"}
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
      </div>
    );
  }
}

export default withRouter(NewRequest);
