export const mockBotResponses = {

    imageSampleResponse : `
  status_update_start**Intent Understanding:** The user is asking for instructions on how to connect to the VPN. This is a how-to question related to NVIDIA's internal processes.
 
**Thought Process:** I need to use the Enterprise Knowledge tool
 
**Response Preparation:** Generating a response using GPT-4.status_update_done

To connect to the NVIDIA VPN, you can follow these steps:

1. Download and install the Cisco AnyConnect client if you haven't already.
2. Open the Cisco AnyConnect client.
3. ![Cisco VPN](https://nvidia-my.sharepoint.com/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.22%20AM.png)
3. In the "Connect to" field, select the address of the server closest to your locatiobn. Click continue
4. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.30%20AM.png?csf=1&web=1&e=464qoM)
4. Enter credentials to authenticate
5. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.40%20AM.png?csf=1&web=1&e=qYCQ9v)
6. Once authenticated, you should be connected to the NVIDIA VPN.
7. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.14.25%20AM.png?csf=1&web=1&e=y8FPt6)

Please note that you should connect to the VPN only if you need to access on-prem services and applications. Also, make sure you connect to the nearest VPN gateway for optimal performance.

If you're having issues connecting to VPN using Cisco AnyConnect, it is highly recommended to use OpenConnect. For instructions on how to connect to the VPN using MFA or for any MFA-related questions, you can refer to the article "FAQ - Authenticate with Microsoft MFA".

Here are the sources used to generate this response:
- [ServiceNow - FAQ - How to Connect to VPN](https://nvidia.service-now.com/esc?id=kb_article&sysparm_article=KB0018368)
- [Sharepoint - VPN Best Practices](https://nvidia.sharepoint-now.com/esc?id=kb_article&sysparm_article=KB0025347)
- [Confluence - Multi-Factor Authentication (MFA)](https://nvidia.confluence-now.com/esc?id=kb_article&sysparm_article=KB0026612)
- [Slack channel - VPN issues](https://nvidia.slack.com)
`,

  // todo move this to util later
imageUserInputSampleResponse : `
status_update_start**Intent Understanding:** The user has provided an image of an error message related to Cisco's VPN client and is asking for an explanation of what the error means. As the error message is not directly visible in the text, I will need to use the OpenDomain tool to search for the error message based on the URL provided.
 
**Thought Process:** I need to use the Open Domain tool
 
**Response Preparation:** Generating a response using GPT-4.status_update_done

The error message "Secure VPN connection terminated locally by the client. Reason 412: The remote peer is no longer responding" is a common error on Cisco VPNs. It means that the VPN client (the device trying to initiate the connection) has lost connection with the VPN server (the device accepting the connection). This could be due to network issues, firewall settings, or problems with the VPN server itself.

If you're having issues connecting to VPN using Cisco AnyConnect, it is highly recommended to use OpenConnect. For instructions on how to connect to the VPN using MFA or for any MFA-related questions, you can refer to the article "FAQ - Authenticate with Microsoft MFA".

**To connect to the NVIDIA VPN, you can follow these steps:**

1. Download and install the Cisco AnyConnect client if you haven't already.
2. Open the Cisco AnyConnect client.
3. ![Cisco VPN](https://nvidia-my.sharepoint.com/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.22%20AM.png)
3. In the "Connect to" field, select the address of the server closest to your locatiobn. Click continue
4. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.30%20AM.png?csf=1&web=1&e=464qoM)
4. Enter credentials to authenticate
5. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.13.40%20AM.png?csf=1&web=1&e=qYCQ9v)
6. Once authenticated, you should be connected to the NVIDIA VPN.
7. ![Cisco VPN](https://nvidia-my.sharepoint.com/:i:/r/personal/amarannan_nvidia_com/Documents/NVBotMultiModal/Screenshot%202024-02-04%20at%2011.14.25%20AM.png?csf=1&web=1&e=y8FPt6)

Here are the sources used to generate this response:
- [ServiceNow - File an IT ticket](https://nvidia.service-now.com/esc?id=kb_article&sysparm_article=KB0018368)
- [Confluence - Multi-Factor Authentication (MFA)](https://nvidia.confluence-now.com/esc?id=kb_article&sysparm_article=KB0026612)
- [Slack channel - VPN issues](https://nvidia.slack.com)
- [Sharepoint - VPN Best Practices](https://nvidia.sharepoint-now.com/esc?id=kb_article&sysparm_article=KB0025347)
`,

chartSampleResponse : `
  status_update_start**Intent Understanding:** The user is asking for a top AI companies marketvalue. This is a how-to question related to NVIDIA's internal processes.

  **Thought Process:** I need to use the Enterprise Knowledge tool.

  **Response Preparation:** Generating a response using GPT-4.status_update_done

  Below is Top AI Companies by Market Cap:

  ![Top AI Companies by Market Cap](ai-compainies-market-cap)

  `,

graphSampleResponse : `
status_update_start**Intent Understanding:** The user is asking for a NVIDIA's stock growth graph. This is a how-to question related to NVIDIA's internal processes.
 
**Thought Process:** I need to use the Enterprise Knowledge tool
 
**Response Preparation:** Generating a response using GPT-4.status_update_done

Below is the NVIDIA stock growth chart over the last five years:

![NVIDIA Stock Growth](nvidia-stock-chart)
`

}