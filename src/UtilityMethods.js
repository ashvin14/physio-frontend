import { feedbackUrl } from "./Constant";

const setUserSession = (user, { authenticated, authenticating, roles }) => {
  const data = JSON.stringify({
    user,
    authenticated,
    authenticating,
    roles,
  });

  localStorage.setItem("userSession", data);
};

const createFeedbackLink = () => {
  return `<p> please click on this <a href="${feedbackUrl}">link</a> and provide us with your valuable feedback</p>`;
};
const getUserSession = () => JSON.parse(localStorage.getItem("userSession"));

const generateTemplateForExtensionFlexion = (data, message) =>
  ` <h3>Report for ROM analysis</h3>
<table class="table table-bordered" style="width:100%;">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Extension (Range in degrees)</th>
      <th scope="col">Flexion (Range in degrees)</th>
      <th scope="col">Joint</th>
    </tr>
  </thead>
  <tbody>
  ${data
    .map(
      dataItem => `
    <tr>
      <td>${new Date(dataItem.created_at).getDate()}/${new Date(
        dataItem.created_at,
      ).getMonth() + 1}/${new Date(dataItem.created_at).getFullYear()}</td>
      <td>${dataItem.min_rom}-${dataItem.max_rom} </td>
      <td>${dataItem.max_rom}-${dataItem.min_rom} </td>
      <td>${dataItem.joint}</td>
    </tr>
    `,
    )
    .join("")}
  </tbody>
</table>
<hr/>

` + message;

const generateReportTemplateForMaxScore = (data, message) =>
  `<h3>Report for Maximum Score</h3>
    <table class="table table-bordered" style="width:100%;">
      <thead>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Max Score</th>
          <th scope="col">Joint</th>
        </tr>
      </thead>
      <tbody>
      ${data
        .map(
          dataItem => `
        <tr>
          <td>${dataItem.day}</td>
          <td>${dataItem.maxscore}</td>
          <td>${dataItem.joint}</td>
        </tr>
        `,
        )
        .join("")}
      </tbody>
    </table>
    <hr/>
    
    ` + message;

const removeUserSession = () => localStorage.clear();

const hasUserSession = () => localStorage.hasOwnProperty("userSession");

const handleError = (ErrorStore, err) => {
  console.log(err);
  if (err.response === undefined) {
    ErrorStore.setError("Could not connect to server at this moment :/ ");
    ErrorStore.changeStatus();
    return;
  }
  ErrorStore.setError(err.response.data);
  ErrorStore.changeStatus();
};

export default {
  getUserSession,
  setUserSession,
  removeUserSession,
  hasUserSession,
  handleError,
  createFeedbackLink,
  generateReportTemplateForMaxScore,
  generateTemplateForExtensionFlexion,
};
