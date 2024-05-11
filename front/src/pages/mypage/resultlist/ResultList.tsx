import { useState, useEffect } from 'react'
import styles from '@/pages/mypage/resultlist/ResultList.module.scss'
import { userState } from '@/stores/useState'
import { Link } from 'react-router-dom'

interface CompetitionResultList {
  id: number
  category: string
  name: string
  period: string
  awardCode: string
  attendCode: string
}

const ResultList = () => {
  const [resultList, setResultList] = useState<CompetitionResultList[]>([
    {
      id: 1,
      category: '',
      name: '',
      period: '',
      awardCode: '',
      attendCode: '',
    },
  ])

  useEffect(() => {
    /* 내 대회 목록 API 호출 */
    const resultListData: CompetitionResultList[] = [
      {
        id: 1,
        category: 'A',
        name: 'Team A',
        period: '2024-05-01',
        awardCode: 'A001',
        attendCode: 'T001',
      },
      {
        id: 2,
        category: 'B',
        name: 'Team B',
        period: '2024-05-02',
        awardCode: 'A002',
        attendCode: 'T002',
      },
      {
        id: 3,
        category: 'C',
        name: 'Team C',
        period: '2024-05-03',
        awardCode: 'A003',
        attendCode: 'T003',
      },
      {
        id: 4,
        category: 'D',
        name: 'Team D',
        period: '2024-05-04',
        awardCode: 'A004',
        attendCode: 'T004',
      },
      {
        id: 5,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 6,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 7,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 8,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 9,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 10,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
      {
        id: 11,
        category: 'E',
        name: 'Team E',
        period: '2024-05-05',
        awardCode: 'A005',
        attendCode: 'T005',
      },
    ]
    setResultList(resultListData)
  }, [])

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'HOME > 참가한 대회'}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.category}>{'카테고리'}</div>
          <div className={styles.name}>{'대회명'}</div>
          <div className={styles.period}>{'대회기간'}</div>
          <div className={styles.awardcode}>{'참가코드'}</div>
          <div className={styles.attendcode}>{'수상코드'}</div>
        </div>
        <div className={styles.body}>
          {resultList.map((result) => (
            <div key={result.id} className={styles.line}>
              <div className={styles.category}>{result.category}</div>
              <Link to={`/competition/detail/${result.id}`} className={styles.name}>
                <div className={styles.point}>{result.name}</div>
              </Link>
              <div className={styles.period}>{result.period}</div>
              <Link to={`/competition-results/${result.awardCode}`} className={styles.awardcode}>
                <div className={styles.point}>{result.awardCode}</div>
              </Link>
              <Link to={`/competition-results/${result.attendCode}`} className={styles.attendcode}>
                <div className={styles.point}>{result.attendCode}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultList
