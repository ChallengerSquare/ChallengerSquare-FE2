import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { teamDetailTapState, teamIdxState } from '@/pages/mypage/store'
import { TeamData, TeamListData } from '@/types/team'
import TeamContest from '@/pages/mypage/teamlist/TeamContest'
import TeamMember from '@/pages/mypage/teamlist/TeamMember'
import ProfileImg from '@/components/ProfileImg/ProfileImg'

interface TeamDetailProps {
  teamData: TeamListData
}

const TeamDetail = ({ teamData }: TeamDetailProps) => {
  const [teamDetailTap, setTeamDetailTap] = useRecoilState(teamDetailTapState)
  const [team, setTeam] = useState<TeamListData>(teamData)

  useEffect(() => {
    setTeam(teamData)
  }, [teamData])

  const handleTapState = (state: boolean) => {
    setTeamDetailTap(state)
  }

  return (
    <div className={styles.teamlist}>
      <div className={styles.head}>
        <div>{`Team > 팀목록 > ${team.teamName}`}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.team}>
          <div className={styles.team_logo}>
            <ProfileImg imgUrl={team.teamImg} imgName={'팀이미지'} name={'teamdetail'} edit />
          </div>
          <div className={styles.team_summary}>
            <div>
              <span>{team.teamName}</span>
            </div>
            <div>{team.description}</div>
          </div>
        </div>
        <div className={styles.team_content}>
          <div className={styles.tap}>
            <button
              type={'button'}
              className={`${styles.tap} ${teamDetailTap === false ? styles.active : ''}`}
              onClick={() => handleTapState(false)}
              disabled={teamDetailTap === false}
            >
              {'개최 대회'}
            </button>
            <button
              type={'button'}
              className={`${styles.tap} ${teamDetailTap === true ? styles.active : ''}`}
              onClick={() => handleTapState(true)}
              disabled={teamDetailTap === true}
            >
              {'인원'}
            </button>
          </div>
          <div className={styles.content}>
            {teamDetailTap === false ? <TeamContest id={team.teamId} /> : <TeamMember id={team.teamId} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDetail
