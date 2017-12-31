import React from "react";
import SEO from "../components/SEO";

export default class Error extends React.Component {
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
                <div className="wrapper h2">
                  Something went wrong. Please try again.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <SEO title="Something went wrong. Please try again." />
      </div>
    );
  }
}
