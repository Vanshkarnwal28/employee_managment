# Render Deployment Guide

Follow these steps to deploy this repository to Render for free:

1. Create a [Render](https://render.com/) account and connect it to your GitHub.
2. Click **New +** > **Web Service**.
3. Select your GitHub repository: `Vanshkarnwal28/employee_managment`.
4. Render will auto-detect the Node environment. Ensure the following settings are configured:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down to **Environment Variables** and click **Add Environment Variable**. Add your keys just like in the `.env` file:
   - Key: `MONGO_URI`
   - Value: `mongodb+srv://vansh:admin12@vansh.kxvheas.mongodb.net/employee`
   - Key: `PORT`
   - Value: `4000` (or `5000` or omit, Render assigns a default port automatically)
6. Choose the **Free** instance type.
7. Click **Create Web Service**.

Render will now build and deploy your Express App. Once deployed, it will give you a public URL (e.g., `https://employee-management-xxx.onrender.com`). You can test it by throwing a POST request to `<YOUR_RENDER_URL>/api/employees`.
