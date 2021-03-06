import React, { Component } from 'react';
import { WebView } from 'react-native';

class PlaidAuthenticator extends Component {
	render() {
		const {
			publicKey,
			selectAccount,
			env,
			product,
			clientName,
			webhook,
			style,
			onMessage,
			...rest,
		} = this.props;

		return (
			<WebView
				style={style}
				source={{
					uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&webhook=${webhook}&selectAccount=${selectAccount}`,
				}}
				onMessage={e => this.onMessage(e)}
				{...rest}
			/>
		);
	}

	onMessage(e) {
		/*
      Response example for success

      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */

		this.props.onMessage(JSON.parse(e.nativeEvent.data));
	}
}

export default PlaidAuthenticator;
