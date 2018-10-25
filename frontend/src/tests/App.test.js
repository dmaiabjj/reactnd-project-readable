import React from "react"
import App from "../components/App"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Component] App', () => {
  const context   = new ReactRouterEnzymeContext();

  it('Shallow renders correctly', () => {
    expect(shallow(<App/>,context.get()));
  });



});
