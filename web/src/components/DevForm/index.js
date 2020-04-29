import React, {useState, useEffect} from 'react' 
import './styles.css'

function DevForm({onSubmit}){  
    const [github_username, setGithubUserName] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        console.log('Ew')
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
    
    return (

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e=> setGithubUserName(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs"
            id="techs"
            required
            value={techs}
            onChange={e=> setTechs(e.target.value)}/>
          </div>

          <div className="input-group">

            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude"
              type="number"
              id="latitude"
              required
              value={latitude}
              onChange={e=> setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude"
              type="number"
              id="longitude"
              required
              value={longitude}
              onChange={e=> setLongitude(e.target.value)}/>
            </div>

          </div>
         

          <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm