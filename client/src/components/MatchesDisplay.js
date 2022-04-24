import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const MatchesDisplay = ({matches, setClickedUser}) => {
    const [ matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies,setCookie,removeCookie] = useCookies(null)
    
    const matchedUserIds = matches.map(({user_id})=> user_id)
    const userId = cookies.UserId

    const getMatches =async function(){
        try{
         const response =  await axios.get("http://localhost:8000/users",{
            params:{ userIds: JSON.stringify(matchedUserIds)}
          })
          setMatchedProfiles(response.data)
        }
        catch (err){
          console.log(err)
        }
    }
    useEffect(()=>{
      getMatches()
    },[matches])

    const  filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id === userId).length > 0 
    )

    return (
        <div className="matches-display">
          {filteredMatchedProfiles?.map((match)=>(
            <div key={match.user_id} className="match-card is-loading mb-3" onClick={()=>{setClickedUser(match)}}>
              <div className="img-container skeleton">
                <img src={match?.url} alt={match?.first_name + "profile"}></img>
              </div>
              <h3>{match?.first_name}</h3>
            </div>
          ))}
        </div>
    )
}

export default MatchesDisplay