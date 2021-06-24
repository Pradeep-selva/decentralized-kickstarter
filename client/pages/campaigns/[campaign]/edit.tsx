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
import Head from "next/head";
import { withRouter } from "next/router";
import { StatusIndicator } from "../../../components";
import styles from "../../../styles/Pages.module.css";
import homeStyles from "../../../styles/Home.module.css";
import { useValidateCampaign } from "../../../validators";
import { web3 } from "../../../instances";
import RouteNames from "../../../config/routes";
import { getCampaignData, updateCampaign } from "../../../utils";
import {
  CampaignDetailProps,
  NewCampaignState,
  RouterProp
} from "../../../types";

type IProps = RouterProp & CampaignDetailProps;

class EditCampaign extends Component<IProps, NewCampaignState> {
  constructor(props: IProps) {
    super(props);

    const { minContribution, title, description, image } = props.summary;

    this.state = {
      loading: false,
      showConfirm: false,
      showStatus: false,
      errors: null,
      failMessage: "",
      values: {
        minContribution,
        title,
        description,
        image
      }
    };
  }

  static async getInitialProps(context) {
    const address = context.query.campaign;
    const summary = await getCampaignData(address);

    return { summary, address };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const {
      summary: { manager },
      address,
      router
    } = this.props;

    if (accounts[0] !== manager)
      router.push(RouteNames.campaignById.as(address));
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
    const [payload, errors] = useValidateCampaign(values, true);

    if (!!errors) this.setState({ errors });
    else {
      this.toggleLoading();
      this.setState({ showStatus: true, errors: {} });

      const accounts = await web3.eth.getAccounts();
      const err = await updateCampaign(
        payload,
        accounts[0],
        this.props.summary.index
      );

      if (err) {
        this.setState({
          failMessage: !!accounts.length
            ? err.message
            : "Transaction failed! Make sure you have metamask installed to make a transaction.",
          errors: null
        });
      } else {
        this.setState({
          errors: null,
          failMessage: ""
        });
      }

      this.toggleLoading();
      setTimeout(() => {
        this.setState({ showStatus: false });
        !this.state.failMessage.length &&
          this.props.router.push(
            RouteNames.campaignById.as(this.props.address)
          );
      }, 5000);
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  closeDialog = () => this.setState(() => ({ showConfirm: false }));

  render() {
    const { values, errors, showConfirm, loading, showStatus, failMessage } =
      this.state;
    const { address } = this.props;

    return (
      <div>
        <Head>
          <title>DK: Edit Campaign</title>
          <meta
            name='description'
            content={`Edit the updatable fields of campaign ${address}`}
          />
          <meta property='og:site_name' content='Decentralized KickStarter' />
          <meta
            property='og:description'
            content={`Edit the updatable fields of campaign ${address}`}
          />
          <meta property='og:title' content='Campaign Edit' />
        </Head>
        <main className={homeStyles.main}>
          <Container>
            <h1 className={styles.heading}>
              <Icon name={"ticket"} /> Edit Campaign {address}
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
                success={"Your campaign was successfully updated!"}
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
                  disabled
                />
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
                Edit
              </Button>
            </Form>
          </Container>
          <Confirm
            content={"Are you sure you want to update this campaign?"}
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

export default withRouter(EditCampaign);
