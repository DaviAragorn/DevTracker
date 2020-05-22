import React, {useState, useEffect} from 'react'
import InputBlock from '../InputBlock'
import './styles.scss'

function DevForm({onSubmit}){  
    const [github_username, setGithubUserName] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        })

        setGithubUserName('');
        setTechs('');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
            const{latitude, longitude} = position.coords
    
            setLatitude(latitude)
            setLongitude(longitude)
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
        )
      }, [])

    function notNull(value){
      return value !== null;
    }

    function validateLatitude(value){
      return (value !== null && (parseFloat(value) <= 90) && (parseFloat(value) >= -90));
    }

    function validateLongitude(value){
      return (value !== null && ( parseFloat(value) <= 180) && (parseFloat(value) >= -180));
    }
    
    return (

        <form onSubmit={handleSubmit}>

          <InputBlock className="input-block" title="Github Username" validation={notNull} name="github_username" type="string" 
          value={github_username} updateValue={setGithubUserName}/>

          <InputBlock className="input-block" title="Technologies" validation={notNull} name="techs" type="string" 
          value={techs} updateValue={setTechs}/>

          <div className="input-group">
            <InputBlock className="input-block" title="Latitude" validation={validateLatitude} name="latitude" type="number" 
            value={latitude} min="-90.00" max="90.00" step="any" updateValue={setLatitude}/>

            <InputBlock className="input-block" title="Longitude" validation={validateLongitude} name="longitude" type="number" 
            value={longitude} min="-180.00" max="180.00" step="any" updateValue={setLongitude}/>
          </div>
          

          <button type="submit">Submit</button>
        </form>
    )
}

export default DevForm