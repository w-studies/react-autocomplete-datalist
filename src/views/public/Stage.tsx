import { useEffect, useState } from 'react'
import { AutoComplete } from '../../components/AutoComplete'
import { api } from '../../services/api'

const { VITE_API_USERS } = import.meta.env

const ACInitialState = {
  label: '',
  placeholder: 'Escolha...',
  selected: { id: '', value: '' }
}

export const Stage = () => {
  const [usersList, setUsersList] = useState<any>({ data: { results: [] } })
  const [ACUsers, setACUsers] = useState(ACInitialState)
  const [ACCities, setACCities] = useState(ACInitialState)

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  async function fetchData() {
    const data = await api.get(VITE_API_USERS)
    setUsersList(data)
  }

  const setACUsersState = (obj: any) => {
    setACUsers(old => ({ ...old, ...obj }))
  }
  const setACCitiesState = (obj: any) => {
    setACCities(old => ({ ...old, ...obj }))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-auto">
          <pre>{JSON.stringify({ ACUsers }, null, 2)}</pre>
          <label>Autocomplete</label>
          <AutoComplete
            input={{
              value: ACUsers.label,
              placeholder: ACUsers.placeholder,
              onInput: ({ target: { value } }: any) => {
                setACUsersState({ label: value })
              }
            }}
            onChange={({ id, name }: any) => {
              setACUsersState({ label: name, selected: { id, value: name } })
            }}
            options={usersList.data.results}
          />
        </div>
        <div className="col-auto">
          <pre>{JSON.stringify({ ACCities }, null, 2)}</pre>
          <label>Autocomplete</label>
          <AutoComplete
            input={{
              value: ACCities.label,
              placeholder: ACCities.placeholder,
              onInput: ({ target: { value } }: any) => {
                setACCitiesState({ label: value })
              }
            }}
            onChange={({ id, name }: any) => {
              setACCitiesState({ label: name, selected: { id, value: name } })
            }}
            options={usersList.data.results}
          />
        </div>
        <div className="col-auto ms-auto">
          <button
            className="btn rounded-pill btn-warning"
            onClick={() => {
              setACUsersState(ACInitialState)
              setACCitiesState(ACInitialState)
            }}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
