import React from 'react';
import styled from "styled-components";
import MatchRow from '../components/MatchRow';
import SearchBar from "material-ui-search-bar";

const PageContainer = styled.div`
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5vh 3vh 5vh;
  width: 75%;
`;

const Search = styled(SearchBar)`
  position: absolute;
  margin-left: 45vw;
  margin-top: 2vw;
  width: 15vw;
  height: 10vh;
`;

const TitleText = styled.p`
  font-size: 2vw;
  font-weight: bold;
`;


export default function Matches() {

  // React.useEffect(() => {
  //   const getMatches = async () => {
  //     const options = {
  //       headers: {
  //         'token': localStorage.getItem('token')
  //       },
  //     };
  //     const response = await fetch("http://localhost:8000/", options);
  //     const json = await response.json();
  //     setAllData(json);
  //   };
  //   getMatches();
  // }, []);
 
  const [searchInput, setSearchInput] = React.useState('');
  const [allData, setAllData] = React.useState([
    {"name": "Kaiqi Liang", "skills": ["Reactjs", "CSS", "SQL"], "jobApplied": "Software Developer at Apple"}, 
    {"name": "Richard Wang", "skills": ["C++", "AWS", "SQL"], "jobApplied": "Game Engineer at Riot Games"}, 
    {"name": "Tony Lu", "skills": ["Python", "Linear Regression", "Tableau"], "jobApplied": "Data Analyst at Quantium"}, 
    {"name": "William Huang", "skills": ["C++", "Mechatronics", "MIPS"], "jobApplied": "Robot Developer at Google"} 
  ]);
  const [filteredData, setFilteredData] = React.useState(allData);
  
  const searchCheck = (data) => data.toLowerCase().includes(searchInput.toLowerCase()); 
  const skillsCheck = (skills) => skills.filter(searchCheck).length > 0;
  const search = () => setFilteredData(allData.filter((match) => searchCheck(match.name) || skillsCheck(match.skills) || searchCheck(match.jobApplied)));
  
  return (  
    <PageContainer>
      <MatchesContainer>
        <TitleText>All Matches</TitleText>
        <Search
          value={searchInput}
          onChange={(newValue) => setSearchInput(newValue)}
          placeholder={'Name, skill or job'}
          onRequestSearch={search}
          onCancelSearch={() => setFilteredData(allData)}
        />
        {filteredData.map((match, index) => <MatchRow key={index} name={match.name} skills={match.skills} jobApplied={match.jobApplied}/>)}
      </MatchesContainer>
    </PageContainer>
  )
}