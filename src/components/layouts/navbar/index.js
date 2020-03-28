import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { mq } from '@/components/layouts/utils/base'
import NavLinks from './NavLinks'
import { Colors } from '@/components/layouts/utils/theme'

const NavBarContainer = styled.header`
  z-index: 10000;
  background-color: ${Colors.white};
  height: 100px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: -8px -6px 18px 2px #5d5b5b;

  ${mq.md(css`
    height: 64px;
  `)}
`
const Container = styled.div`
  margin: 0px auto;
  max-width: 1024px;
  padding: 10px 20px;
  padding-bottom: 10px;
  color: ${Colors.mirage};
  height: 100%;
`
const link = css`
  color: ${Colors.white};
  text-decoration: none;
  font-weight: 400;
  text-transform: lowercase;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ${mq.md(css`
    margin-bottom: 0px;
  `)}
`
const LogoImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}


const NavBar = (props) => {
  const {
    isMobPad,
    location,
  } = props

  return (
    <NavBarContainer>
      <Container>
        <Header>
          <LogoImage/>
          {
            !isMobPad
              ? <NavLinks location={location} />
              : null
          }

        </Header>
        {
          isMobPad 
            ? <NavLinks location={location} />
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

export default NavBar