import React, { useState } from "react"

import styles from "./styles.module.scss"
import { IoArrowDown } from "react-icons/io5"
import cn from "classnames"
import { BetsList } from "entities/bet"
import { BetsOpen, BetsCreate } from "features/bets"
import { Card } from "shared/ui/card"
import { useBets } from "entities/bet/model"
import { MatchTitle } from "entities/match/ui/title"
import { MatchDate } from "entities/match/ui/date"
import { BetsWithdraw } from "features/bets/withdraw"

interface MatchItemProps {
  match: Match
}

export const MatchCard = ({ match }: MatchItemProps) => {
  const [isOpenCard, setIsOpenCard] = useState(false)
  const [isOpenBets, setIsOpenBets] = useState(false)
  const { bets } = useBets(match.sc_id, isOpenBets)

  const handleArrowClick = () => {
    if (isOpenCard) {
      setIsOpenBets(false)
      setIsOpenCard(false)
      return
    }
    setIsOpenCard(true)
  }

  return (
    <Card className={styles.item} as="li">
      <div className={styles.itemWrapper}>
        <div className={styles.itemContent}>
          <div
            className={cn(styles.itemInfo, {
              [styles.isOpen]: isOpenCard,
            })}
          >
            <MatchTitle title={`${match.sc_id} - ${match.title}`} />
            <MatchDate date={match.start_at} />
            {isOpenCard && (
              <div className={styles.itemBtns}>
                <BetsOpen
                  isOpen={isOpenBets}
                  onClick={() => setIsOpenBets(!isOpenBets)}
                />
                <BetsWithdraw onClick={() => console.log("withdraw")} />
              </div>
            )}
          </div>
          {Object.entries(match.markets).map(
            ([key, marketsVariants], indexRow) => (
              <ul className={styles.itemMarkets} key={indexRow}>
                {marketsVariants.map((market, index) => (
                  <BetsCreate
                    key={`${key}_${index}`}
                    match={match}
                    market={market}
                    isOpen={isOpenCard}
                  />
                ))}
              </ul>
            )
          )}
        </div>
        <div
          onClick={handleArrowClick}
          className={cn(styles.itemArrow, {
            [styles.isOpen]: isOpenCard,
          })}
        >
          <IoArrowDown fontSize={20} />
        </div>
      </div>
      {isOpenBets && <BetsList bets={bets} />}
    </Card>
  )
}
