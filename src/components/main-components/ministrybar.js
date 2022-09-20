import React from 'react'
import styled from 'styled-components'

const ministrybar = () => {
  return (
    <MinistryBar className="row ministry-bar align-items-center">
    <img src="/images/ministry-tops.png" alt="ministry bar" />
  </MinistryBar>
  )
}

const MinistryBar = styled.div`

height:20%;
background-color:var(--white-alpha-25);
justify-content: center;
margin-bottom:20px;
border-radius:10px;
border:1px solid var(--white-alpha-40);
img{
    
    max-height:90%;
    object-fit:cover;
  }
`;


export default ministrybar