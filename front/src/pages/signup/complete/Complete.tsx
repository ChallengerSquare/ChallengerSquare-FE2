/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { User } from '@/types/user'
import { registerUser } from '@services/member'
import { userState } from '@/stores/useState'
import Button from '@/components/Button/Button'
import check from '@svgs/signup/check.svg'
import { userForm } from '../store'

import styles from './Complete.module.scss'

const Complete = () => {
  const user: User = useRecoilValue(userForm)
  const setUserState = useSetRecoilState(userState)

  const setUser = () => {
    registerUser(user).then((response) => {
      if (response) {
        console.log('회원가입 성공', response)
        setUserState(user)
      } else {
        console.error('회원가입 실패')
      }
    })
  }

  return (
    <>
      <div className={styles['main-box']}>
        <img src={check} alt="Checkmark" className={styles.size} />
        <div className={styles.font}>가입이 완료되었습니다!</div>
        <div className={styles.font}>서비스를 이용하러 가볼까요?</div>
        <Link to="/">
          <Button variation="purple default" onClick={setUser}>
            홈으로
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Complete
