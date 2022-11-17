import { useEffect, useRef, useState } from 'react'

export const AutoComplete = ({ input, options, value, onChange, isLoading }: any) => {
  const inputGroup: any = useRef()

  const removeInputGroupFocus = () => inputGroup.current.classList.remove('focus')

  const handleOptionClick = ({ id, name }: any) => {
    onChange({ id, name })
    removeInputGroupFocus()
  }

  const clickOutSide = (e: any) => {
    let clickedElement = e.target
    let clickOutSide = true
    do {
      if (clickedElement === inputGroup.current) {
        clickOutSide = false
        break
      }

      clickedElement = clickedElement.parentNode
    } while (clickedElement)

    clickOutSide && removeInputGroupFocus()
  }

  useEffect(() => {
    document.addEventListener('click', clickOutSide)
    return () => {
      document.removeEventListener('click', clickOutSide)
    }
  }, [])

  return (
    <div className="input-group-autocomplete" ref={inputGroup}>
      <input
        type="search"
        {...input}
        list="datalistOptions"
        className="form-select"
        onFocus={() => {
          inputGroup.current.classList.add('focus')
        }}
      />
      <div className="datalist w-100">
        <ul className="list-group">
          {isLoading ? (
            <li className="list-group-item p-1 d-flex">Carregando...</li>
          ) : (
            options.map(({ id, name, status, species, gender, image }: any) => (
              <li
                className="list-group-item p-1 d-flex"
                key={id}
                onClick={() => handleOptionClick({ id, name })}>
                <img src={image} alt="" className="rounded-circle me-2" width={40} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <span className="small text-nowrap me-2">{name}</span>{' '}
                    <small
                      className={`badge bg-${
                        status === 'Alive' ? 'success' : 'secondary'
                      } rounded-pill`}>
                      {status}
                    </small>
                  </div>
                  <div>
                    <small className="badge text-bg-light">{species}</small>
                    <small className="badge text-bg-info rounded-pill">{gender}</small>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
