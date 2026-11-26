import { useState } from 'react'
import '../css/MyChildren.css'

const children = [
  {
    id: '1',
    name: 'ФИО Ребенка1',
    debt: 1420,
    collections: [
      { id: 1, status: 'Активный' },
      { id: 2, status: 'Активный' },
      { id: 3, status: 'Завершен' },
      { id: 4, status: 'Завершен' },
    ],
  },
  {
    id: '2',
    name: 'ФИО Ребенка2',
    debt: 4000,
    collections: [{ id: 5, status: 'Активный' }],
  },
]

const totalDebt = children.reduce((total, child) => total + child.debt, 0)

function MyChildrenPage() {
  const [childId, setChildId] = useState(children[0].id)
  const [status, setStatus] = useState('all')
  const child = children.find((item) => item.id === childId) ?? children[0]
  const collections = child.collections.filter(
    (collection) => status === 'all' || collection.status === status,
  )

  return (
    <div className="my-children" lang="ru">
      <nav className="my-children__breadcrumbs" aria-label="Навигационная цепочка">
        <a href="/">Главная</a>
        <span className="my-children__chevron my-children__chevron--back" aria-hidden="true" />
        <span aria-current="page">Мои дети</span>
      </nav>

      <main className="my-children__panel">
        <header className="my-children__header">
          <h1>Мои дети</h1>
          <button className="my-children__account" type="button" disabled>
            Персональный счет семьи
            <span className="my-children__chevron" aria-hidden="true" />
          </button>
        </header>

        <div className="my-children__total">
          <span>Общий долг</span>
          <strong>{totalDebt}</strong>
        </div>

        <div className="my-children__filters">
          <label>
            Ребенок
            <select value={childId} onChange={(event) => setChildId(event.target.value)}>
              {children.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Сборы
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">Все</option>
              <option value="Активный">Активные</option>
              <option value="Завершен">Завершенные</option>
            </select>
          </label>
        </div>

        <section aria-labelledby="my-children-child-name">
          <div className="my-children__summary">
            <h2 id="my-children-child-name">{child.name}</h2>
            <p>Долг по ребенку: {child.debt}</p>
          </div>

          <div className="my-children__table-scroll">
            <table aria-labelledby="my-children-child-name">
              <colgroup>
                <col style={{ width: '18.2%' }} />
                <col style={{ width: '13.2%' }} />
                <col style={{ width: '17.6%' }} />
                <col style={{ width: '14.8%' }} />
                <col style={{ width: '17.1%' }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Сбор</th>
                  <th scope="col">Статус</th>
                  <th scope="col">Срок оплаты</th>
                  <th scope="col">Начислено</th>
                  <th scope="col">Внесено</th>
                  <th scope="col">Осталось</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
                  <tr key={collection.id}>
                    <td />
                    <td>{collection.status}</td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                ))}
                {collections.length === 0 && (
                  <tr>
                    <td colSpan={6}>Сборов с таким статусом нет</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MyChildrenPage
