import React, { useState } from 'react'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import firebase from 'gatsby-plugin-firebase'
import { reset } from 'redux-form'
import Cookies from 'js-cookie';

import Button from '@/components/ui/Button'
import { Colors } from '@/components/layouts/utils/theme'
import { mq } from '@/components/layouts/utils/base'
import { css } from '@emotion/core'
import WizardForm from '@/components/wizard/WizardForm'
import Title from '@/components/ui/Title'
import SEO from '../components/seo'

const BackgroundContent = ({ className, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          device: file(relativePath: { eq: "banner.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = data.device.childImageSharp.fluid
        return (
          <BackgroundImage
            Tag="section"
            className={className}
            fluid={imageData}
            backgroundColor={Colors.mirage}
          >
            {children}
          </BackgroundImage>
        )
      }}
    />
  )
}

const BackgroundContainer = styled(BackgroundContent)`
  width: 100%;
  height: 90vh;
  background-repeat: repeat-y;

  ${mq.md(css`
    height: 50vh;
  `)}
`
const Description = styled.p`
  width: 90%;
  text-align: center;
  margin: 0 auto 20px;
`
const WizardContainer = styled.div`
  background: white;
  margin: 20px 0;
  padding: 30px;
  min-height: 481px;
  border-radius: 5px;
  box-shadow: 4px 4px 11px -7px rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(93, 105, 112, 0.3);
`
const HighlightTitle = styled.span`
  color: white;
  margin: 40px 0 1% 0;
  background: #e65862;
  width: 140px;

  ${mq.md(css`
    color: white;
    margin: 120px 0 1% 0;
    background: #e65862;
    width: 160px;
  `)}
`
const ThanksColor = styled.span`
  color: ${Colors.lightGreen};
`
const ButtonContainer = styled.div`
  margin: 10px auto;
  text-align: center;

  ${mq.md(css`
    margin: 70px auto;
  `)}
`

const TestPage = () => {
  const [showForm, setShowForm] = useState(true)

  const setAnswerData = async (values, dispatch) => {
    if (values) {
      const answersCollection = firebase.firestore().collection('answers')
      const result = await answersCollection.add({
        ...values,
        submittedDate: new Date(),
      })
  
      if (result.id) {
        setShowForm(false)
        const mindsDBCovidCount = Cookies.get('mindsDBCovidCount') ? Cookies.get('mindsDBCovidCount') : 0

        Cookies.set('mindsDBCovid', 'completed');
        Cookies.set('mindsDBCovidCount', parseInt(mindsDBCovidCount) + 1);

        dispatch(reset('wizard'))
      } 
    }
  }

  return (
    <>
      <SEO title="Censu" />
      <BackgroundContainer>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <Title marginTop="60px"  max="10" min="28" color="white">
                <HighlightTitle>COVID-19:</HighlightTitle> FLATTEN THE CURVE IN YOUR CITY
              </Title>
            </div>
            <div className="col-xs-12 col-md-12">
              {/* Wizard */}
              {
                showForm
                  ? (
                    <WizardContainer>
                      <WizardForm onSubmit={setAnswerData} />
                    </WizardContainer>
                  )
                  : (
                    <WizardContainer>
                      <Title marginTop="40px" marginBottom="40px" max="10" min="20">
                        We Don’t Have Enought Information On Your Location to Provide Futher Insights.  
                      </Title>
                      <Description>
                        Please help us by sharing this to your neighbors and friends all over the world, rememember all data gather here is available at:
                      </Description>
                      <Title marginTop="50px" marginBottom="30px" max="10" min="28" color="black">
                          THANKS FOR HELPING <ThanksColor>SAVE</ThanksColor> LIVES
                      </Title>
                      <ButtonContainer>
                        <Button
                          type="button"
                          stylesType="common"
                          backgroundColor={Colors.lightGreen}
                          backgroundColorHover={Colors.white}
                        >
                          SHARE LINK
                        </Button>
                      </ButtonContainer>
                    </WizardContainer>
                  )
              }
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </>
  )
}

export default TestPage
