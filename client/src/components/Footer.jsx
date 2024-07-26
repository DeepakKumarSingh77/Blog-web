import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const Container=styled(Box)`
    display: flex;
    justify-content: space-around;
    background-color:#aecbd8;
    margin-top: 0.5rem;
`;
const Wrapper=styled(Box)`
   
`;
const Icon=styled("p")`
    font-size: 25px;
    font-weight: 500;
`;
const Footer = () => {
  return (
    <div>
      <Container>
        <Wrapper style={{width:'30%'}}>
          <Icon>Deepak Blog</Icon>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            error iusto, iste quia architecto laudantium dignissimos saepe nulla
            deleniti vitae accusantium fugiat distinctio corrupti sed, aut at?
            Soluta, magnam impedit.
          </p>
        </Wrapper>
        <Wrapper>
            <Icon>Sitemap</Icon>
            <p>HOME</p>
            <p>BLOGS</p>
            <p>ABOUT</p>
            <p>Contact</p>
            <p>Write</p>
        </Wrapper>

        <Wrapper>
            <Icon>Social</Icon>
            <div style={{display:'flex',gap:'1rem'}}>
                <a href="https://www.linkedin.com/feed/"><CiLinkedin style={{width:'30px',height:'30px'}}/></a>
                <a href="https://www.instagram.com/your-profile"><FaInstagram style={{width:'30px',height:'30px'}}/></a>
                <a href="https://github.com/DeepakKumarSingh77"><FaGithubSquare style={{width:'30px',height:'30px'}}/></a>
            </div>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Footer;
