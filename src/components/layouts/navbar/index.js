import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
// import { useStaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { mq } from '@/components/layouts/utils/base'
import NavLinks from './NavLinks'
import { Colors } from '@/components/layouts/utils/theme'
// import { LocalizedLink } from '@/components/ui/LocalizedLink'

const NavBarContainer = styled.header`
  z-index: 10000;
  background-color: transparent;
  height: 100px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;

  ${mq.md(css`
    height: 64px;
  `)}
`
const Container = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  padding-bottom: 10px;
  color: ${Colors.mirage};
  height: 100%;

  ${mq.md(css`
    margin: 0px auto;
    max-width: 80%;
  `)}
`
// const link = css`
//   color: ${Colors.white};
//   text-decoration: none;
//   font-weight: 400;
//   text-transform: lowercase;
// `
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ${mq.md(css`
    margin-top: 5px;
    margin-bottom: 0px;
  `)}
`

// const ImageContainer = styled.div`
//   width: 150px;
// `

// const LogoImage = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       placeholderImage: file(relativePath: { eq: "logo.png" }) {
//         childImageSharp {
//           fluid(maxWidth: 250) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)

//   return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
// }

const NavBar = (props) => {
  const {
    isMobPad,
    location,
    locale,
  } = props

  return (
    <NavBarContainer>
      <Container>
        <Header>
          {/* <ImageContainer>
            <LocalizedLink to="/" css={link}>
              <LogoImage/>
            </LocalizedLink>
          </ImageContainer> */}
          {
            !isMobPad
              ? <NavLinks location={location} locale={locale} />
              : null
          }

        </Header>
        {
          isMobPad 
            ? <NavLinks location={location} locale={locale} />
            : null
        }
      </Container>
    </NavBarContainer>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({
  isMobPad: get(state, 'ui.isMobPad', false),
})

export default connect(mapStateToProps)(NavBar)
