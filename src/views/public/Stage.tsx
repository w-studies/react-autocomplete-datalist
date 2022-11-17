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
  // lists
  const [usersList, setUsersList] = useState<any>({ data: { results: [] } })
  const [citiesList, setCitiesList] = useState<any>({ data: { results: [] } })
  // autoCompletes
  const [ACUsers, setACUsers] = useState(ACInitialState)
  const [ACCities, setACCities] = useState(ACInitialState)
  // queryStrings
  const [userQueryString, setUserQueryString] = useState('')
  const [cityQueryString, setCityQueryString] = useState('')
  // loading status
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)

  useEffect(() => {
    fetchUsers()
    return () => {}
  }, [userQueryString])

  useEffect(() => {
    fetchCities()
    return () => {}
  }, [cityQueryString])

  async function fetchUsers() {
    setIsLoadingUsers(true)
    try {
      const data = await api.get(VITE_API_USERS + userQueryString)
      setUsersList(data)
    } catch (error: any) {
    } finally {
      setIsLoadingUsers(false)
    }
  }
  async function fetchCities() {
    setIsLoadingCities(true)
    try {
      const data = await api.get(VITE_API_USERS + cityQueryString)
      setCitiesList(data)
    } catch (error: any) {
    } finally {
      setIsLoadingCities(false)
    }
  }

  const setACUsersState = (obj: any) => {
    setACUsers(old => {
      const newData = { ...old, ...obj }
      setUserQueryString('?name=' + newData.label)
      return newData
    })
  }
  const setACCitiesState = (obj: any) => {
    setACCities(old => {
      const newData = { ...old, ...obj }
      setCityQueryString('?name=' + newData.label)
      return newData
    })
  }

  const clearFilters = (e: any) => {
    e.currentTarget.blur()
    const rowFilters: any = document.querySelector('.row.filters')
    for (const e of rowFilters.querySelectorAll('input, select')) {
      e.value = ''
      e.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  return (
    <div className="container">
      <div className="row filters">
        <div className="col-auto">
          <pre>{JSON.stringify({ ACUsers }, null, 2)}</pre>
          <label>Autocomplete</label>
          <AutoComplete
            isLoading={isLoadingUsers}
            input={{
              value: ACUsers.label,
              placeholder: ACUsers.placeholder,
              onInput: (search: string) => setACUsersState({ ...ACInitialState, label: search })
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
            isLoading={isLoadingCities}
            input={{
              value: ACCities.label,
              placeholder: ACCities.placeholder,
              onInput: (search: string) => setACCitiesState({ ...ACInitialState, label: search })
            }}
            onChange={({ id, name }: any) => {
              setACCitiesState({ label: name, selected: { id, value: name } })
            }}
            options={citiesList.data.results}
          />
        </div>
        <div className="col-auto ms-auto">
          <button className="btn rounded-pill btn-warning" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
