import { useActionData, useLoaderData } from '@remix-run/react';
import styles from '~/styles/styles.css'

export const links = () =>{
    return [{
        rel: 'stylesheet',
        href:styles
    }] // the unique tag that return array
}

export const meta = () =>({
    title: 'Contacto jaja',
    descripcion:'sitio de contacto'
})

export const loader = async () =>{
    const res = await (await fetch('https://rickandmortyapi.com/api/character')).json();
    return res;
}

export const action = async ({request}) =>{
    const formData = await request.formData()
    console.log('el nombre es:', formData.get('name'))
    return 'guardado';
}

export default function Contacto () {
    const chars = useLoaderData();
    const actions= useActionData();
    return (<div>
        <form style={{display:'flex', flexDirection:'column'}} method='post'>
            <label>
                Nombre
                    <input type ='text' name='name' placeholder='escribe nombre' />
            </label>
            <label>
                Email
                    <input type ='email' name='email' placeholder='escribe tu email' />
            </label>
            <label>
                Comentario
                    <textarea name='comentario' placeholder='escribe el comentario' />
            </label>
            <button>Enviar</button>
        </form>
        {actions&&<h2>{actions}</h2>}
        {chars.results.map((character)=>{
            return <div key={character.id}>
                <img style={{width:'100px'}} src={character.image} />
                <p>{character.name}</p>
            </div>
        })}
    </div>)
}
