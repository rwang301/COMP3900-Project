import React from 'react';
import styled from "styled-components";
import EmployerMatchRow from '../components/EmployerMatchRow';
import SearchBar from "material-ui-search-bar";
import { StoreContext } from '../utils/store';
import JobseekerMatchRow from '../components/JobseekerMatchRow';

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
  const { api, employer } = React.useContext(StoreContext);
  const [searchInput, setSearchInput] = React.useState('');
  const [allData, setAllData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState(allData);
  
  const searchCheck = (data) => data.toLowerCase().includes(searchInput.toLowerCase()); 
  const skillsCheck = (skills) => skills.filter(searchCheck).length > 0;
  const search = () => setFilteredData(allData.filter((match) => searchCheck(match.info.name) || skillsCheck(match.skills) || searchCheck(match.info.job_title)));
  
  React.useEffect(() => {
    const getMatches = async () => {
      const response = employer ? await api.fetch('employer/matches') : await api.fetch('jobseeker/matches');
      if (response) {
        console.log(response);
        setAllData(response);
        setFilteredData(response);
      }
    };
    getMatches();
  }, []);
 
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
        {
          employer ?
            filteredData.map((match, index) => <EmployerMatchRow key={index} info={match.info} skills={match.skills} />)
          :
            filteredData.map((match, index) => <JobseekerMatchRow key={index} info={match.info} skills={match.skills} />)
        }
      </MatchesContainer>
    </PageContainer>
  )
}