import React from 'react';

export default function ProfilePage() {

  React.useEffect(() => {
    const fetchData = async () => {
      const data = {
        "job_title":"hi",
        "location":"lol",
        "description":"desc",
        "employment_type":"full-time",
        "closing_date":"202-09-19"
      };
      const options = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
      };
      const response = await fetch("http://localhost:8000/post/job", options);
      console.log(response);
    }
    fetchData();
  }, []);

  return (
    <></>
  )
}