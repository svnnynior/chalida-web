import React from "react"
import styled from "styled-components"

interface Props {
  toggleNavbar: () => void
  navbarOpen: boolean
}

const Burgermenu: React.FC<Props> = ({ toggleNavbar, navbarOpen }) => {
  return (
    <Wrapper onClick={toggleNavbar}>
      <div className={navbarOpen ? "open" : ""}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </Wrapper>
  )
}

export default Burgermenu

const Wrapper = styled.div`
  position: relative;
  padding-top: 0.7rem;
  cursor: pointer;
  display: block;

  & span {
    background: white;
    display: block;
    position: relative;
    width: 30px;
    height: 5px;
    margin-bottom: 5px;
    transition: all ease-in-out 0.2s;
  }
  .open span:nth-child(2) {
    opacity: 0;
  }
  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -10px;
  }
  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 10px;
  }
`
