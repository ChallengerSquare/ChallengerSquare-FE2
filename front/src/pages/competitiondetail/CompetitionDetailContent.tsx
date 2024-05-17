import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Button from '@/components/Button/Button'
import ParticipateWindow from '../participateWindow/ParticipateWindow'
import styles from './CompetitionDetailContent.module.scss'

interface Props {
  competition: Contest
}

interface Contest {
  contestId: number
  contestTitle: string
  contestContent: string
  contestImage: string
  teamName: string
  teamId: number
  registrationPeriod: {
    start: string
    end: string
  }
  contestPeriod: {
    start: string
    end: string
  }
  contestRegistrationNum: number
  contestFee: number
  contestPhone: string
  isPriority: boolean
  contestCategory: string
  contestLocation: string
  isLeader: boolean
  participantState: string
  contestState: string
  contestAwards: Award[]
}

interface Award {
  awardsId: number
  awardsName: string
  awardsCount: number
  awardsPrize: number
}

const CompetitionContent = ({ competition }: Props) => {
  const isRegistrationOpen = () => {
    const currentDate = new Date()
    const startDate = new Date(competition.registrationPeriod.start)
    const endDate = new Date(competition.registrationPeriod.end)

    return currentDate >= startDate && currentDate <= endDate
  }

  return (
    <>
      <div className={styles.poster}>
        <img src={competition.contestImage} alt="포스터" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <ul>
            <li>
              <span>{competition.contestTitle}</span>
            </li>
            <li>{competition.teamName}</li>
          </ul>
        </div>
        <div className={styles.detail}>
          <ul>
            <li>
              <span>일시</span> {competition.contestPeriod.start} ~ {competition.contestPeriod.end}
            </li>
            <li>
              <span>장소</span> {competition.contestLocation}
            </li>
            <li>
              <span>참가비</span> {competition.contestFee} 원{' '}
              {competition.contestFee === 0 && <p className="point">무료</p>}
            </li>
            <li>
              <span>모집인원</span> {competition.contestRegistrationNum} 명{' '}
              {competition.isPriority && <p className="point">선착순</p>}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          variation="purple"
          disabled={!isRegistrationOpen() || competition.isLeader}
          onClick={() => {
            const features = 'toolbar=no,menubar=no,width=600,height=700,left=100,top=100'
            window.open(`/form/write/${competition.contestId}`, '_blank', features)
          }}
        >
          참가하기
        </Button>
        <p>
          {competition.registrationPeriod.start} ~ {competition.registrationPeriod.end}
        </p>
      </div>
    </>
  )
}

export default CompetitionContent