import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.nav.background};
  height: 80px;
  z-index: 10;
  border-bottom: 0.1rem ${({ theme }) => theme.colors.borderColor} solid;
`

const InnerNav = styled.div`
  width: 90%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`
const NavElement = styled.li<{ currentPage: boolean }>`
  position: relative;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme, currentPage }) => (currentPage ? theme.colors.borderColor : 'white')};
  display: inline-block;
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
  transition: transform 0.3s ease-out;

  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    /* background-color: red; */
    top: 0;
    left: 50%;
    transform: translate(-50%, 15%) scaleX(0);
    transition: transform 0.2s ease;
    width: 80%;
    height: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  }

  &:hover:before {
    transform: translate(-50%, 15%) scaleX(1);
  }
`
const Content = styled.ul`
  flex: 6;
  list-style: none;
  display: none;
  margin: 0;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 0 0;
  flex-direction: row;

  @media only screen and (min-width: 700px) {
    display: flex;
  }
`
const CollapseContent = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  z-index: 9;
  border-bottom: 0.1rem ${({ theme }) => theme.colors.borderColor} solid;
  background: ${({ theme }) => theme.nav.background};
  transform: translate3d(0, ${({ open }) => (open ? 1 : -150)}%, 0);
  transition: 0.3s ease;
  & > ${NavElement} {
    margin: 1rem 0;
  }

  @media only screen and (min-width: 700px) {
    display: none;
  }
`

const Logo = styled.img`
  flex: 1;
  height: 4rem;
`
const HamburgerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 11;
  @media only screen and (min-width: 700px) {
    display: none;
  }
`
const Bar = styled.div`
  height: 3px;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  z-index: 10;
`
const Icon = styled.div<{ open: boolean }>`
  cursor: pointer;
  display: block;
  height: 30px;
  width: 35px;
  padding: 0 5px;
  transition: 0.1s ease;
  z-index: 1;

  &:hover {
    transition: 0.1s ease;
    padding: 0 2px;
  }
  & > ${Bar} {
    transition: 0.3s ease;
  }
  & > ${Bar}:nth-child(1) {
    transform: ${({ open }) => (open ? `translateY(14px) rotate(-45deg)` : `translateY(8px)`)};
  }
  & > ${Bar}:nth-child(2) {
    opacity: ${({ open }) => (open ? `0` : `1`)};
    transform: translateY(12px);
  }
  & > ${Bar}:nth-child(3) {
    transform: ${({ open }) => (open ? `translateY(8px) rotate(45deg)` : `translateY(16px)`)};
  }

  height: 30px;
  width: 35px;
`

function NavBar() {
  const [toggle, setToggle] = useState(false)
  const location = useLocation()
  console.log(location.pathname)
  return (
    <Nav>
      <InnerNav>
        <Link to="/">
          <Logo src="/coin.svg" alt="" />
        </Link>

        <Content>
          <NavElement currentPage={location.pathname === '/farms'}>
            <a href="https://farms.versoundfinance.com/farms">farms</a>
          </NavElement>
          <NavElement currentPage={location.pathname === '/pools'}>
            <a href="https://farms.versoundfinance.com/pools">pools</a>
          </NavElement>
          <NavElement currentPage>
            <Link to="/">exchange</Link>
          </NavElement>
        </Content>
        <HamburgerContainer onClick={() => setToggle(!toggle)}>
          <Icon open={toggle}>
            <Bar />
            <Bar />
            <Bar />
          </Icon>
        </HamburgerContainer>
      </InnerNav>
      <CollapseContent open={toggle}>
        <NavElement currentPage={location.pathname === '/farms'}>
          <a href="https://farms.versoundfinance.com/farms">farms</a>
        </NavElement>
        <NavElement currentPage={location.pathname === '/pools'}>
          <a href="https://farms.versoundfinance.com/pools">pools</a>
        </NavElement>
        <NavElement currentPage>
          <Link to="/">exchange</Link>
        </NavElement>
      </CollapseContent>
    </Nav>
  )
}

export default NavBar
