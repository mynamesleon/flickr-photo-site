import React from "react";
import SEO from "../components/SEO";

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image-fit-container">
        <table className="vertical-centre text-centre">
          <tbody>
            <tr>
              <td>
                <div className="wrapper h2">Page not found</div>
              </td>
            </tr>
          </tbody>
        </table>
        <SEO title="Page not found" />
      </div>
    );
  }
}
