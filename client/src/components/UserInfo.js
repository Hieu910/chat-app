import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const UserInfo = () => {
    const [cookies , setCookie, removeCookie ] =useCookies(['user'])
    const [formData,setFormData] = useState({
        user_id: cookies.UserId,
        first_name:"first name",
        dob_day:"1",
        dob_month:"1",
        dob_year:"2000",
        show_gender:false,
        gender_identity: "man",
        gender_interest: "woman",
        url:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        about:"",
        matches:[]
    })
    
    let navigate = useNavigate()
    const handleChange = (e)=>{
       const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
       const name = e.target.name
       console.log("value"+ value, "name" +name)
       setFormData((prevValue)=>{
        return {
            ...prevValue,
             [name]: value
        }
       })
    }
    const handleSubmit = async (e)=>{
        console.log("submit");
       
        e.preventDefault()
        try{
          const response = await axios.put("http://localhost:8000/user", { formData })

          const success = response.status === 200
          if(success) navigate("/dashboard")

        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <div>
            <Nav minimal={true}
                setShowModal={()=>{}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First name</label>
                            <input id="first_name"
                                type="text"
                                name="first_name"
                                required
                                value={formData.first_name}
                                placeholder="First Name"
                                onChange={handleChange}
                            />
                        <label htmlFor="dob_day">Birthday</label>
                        <div className="row-input-container">
                            <input id="dob_day"
                                type="number"
                                name="dob_day"
                                value={formData.dob_day}
                                required
                                placeholder="DD"
                                onChange={handleChange}
                            />
                            <input id="dob_month"
                                type="number"
                                name="dob_month"
                                required
                                value={formData.dob_month}
                                placeholder="MM"
                                onChange={handleChange}
                            />
                            <input id="dob_year"
                                type="number"
                                name="dob_year"
                                value={formData.dob_year}
                                required
                                placeholder="YYYY"
                                onChange={handleChange}
                            />
                        </div>

                        <label htmlFor="gender">Gender</label>
                        <div className="row-input-container">
                            <input id="man"
                                type="radio"
                                name="gender_identity"
                                onChange={handleChange}
                                checked ={formData.gender_identity === "man"}
                                value="man"
                            />
                            <label htmlFor="man">Man</label>
                            <input id="woman"
                                type="radio"
                                name="gender_identity"
                                onChange={handleChange}
                                checked ={formData.gender_identity === "woman"}
                                value="woman"
                            />
                            <label htmlFor="woman">Woman</label>
                            <input id="more"
                                type="radio"
                                name="gender_identity"
                                value ="more"
                                checked ={formData.gender_identity === "more"}
                                onChange={handleChange}
                            />
                            <label htmlFor="more">More</label>
                        </div>

                        <label htmlFor="show-gender">Show gender on my profile</label>
                            <input id="show-gender"
                                type="checkbox"
                                name="show_gender"
                                checked = {formData.show_gender}
                                onChange={handleChange}
                            />

                        <label>Show Me</label>
                        <div className="row-input-container">
                            <input id="man-interest"
                                type="radio"
                                name="gender_interest"
                                onChange={handleChange}
                                value="man"
                                checked ={formData.gender_interest === "man"}
                            />
                            <label htmlFor="man-interest">Man</label>
                            <input id="woman-interest"
                                type="radio"
                                name="gender_interest"
                                onChange={handleChange}
                                value="woman"
                                checked ={formData.gender_interest === "woman"}
                            />
                            <label htmlFor="woman-interest">Woman</label>
                            <input id="everyone-interest"
                                type="radio"
                                name="gender_interest"
                                value ="everyone"
                                onChange={handleChange}
                                checked ={formData.gender_interest === "everyone"}
                            />
                            <label htmlFor="everyone-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required
                            value={formData.about}
                            placeholder="I like watching Gumball.."
                            onChange={handleChange}
                        />
                        <button type="submit">Submit</button>
                    </section>
              
                    <section>
                         <label htmlFor="about">Profile</label>
                        <input
                            type="url"
                            name="url"
                            id= "url"
                            onChange={handleChange}
                            required
                        />
                        <div className="photo-container">
                           {formData.url && <img src={formData.url} alt="profile pic"></img>}
                        </div>
                    </section>
                </form>
            </div>  
        </div>
        
    )
}

export default UserInfo