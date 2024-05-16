import React, { useState, useEffect } from 'react'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css' // 스타일 추가
import styles from './CompetitionDetailInfo.module.scss'

interface Props {
  content: string | undefined
}

const CompetitionDetailInfo = ({ content }: Props) => {
  const [data, setdata] = useState([])
  useEffect(() => {}, [])

  return (
    <div className={styles.container}>
      {content === undefined ? (
        <div className={styles.empty}>
          <p>등록된 상세정보가 없습니다.</p>
        </div>
      ) : (
        <div className={styles.content}>
          <Viewer initialValue={content || ''} />
        </div>
      )}
    </div>
  )
}

export default CompetitionDetailInfo
