import React, { useState } from "react"
import moment from "moment"

import styles from "./styles.module.scss"
import { IoArrowDown } from "react-icons/io5"
import classNames from "classnames"
import { BetsList } from "entities/bet/ui/bets-list"
import { AddBet } from "features/add-bet/ui"
import { Card } from "shared/ui/card"
import { useBets } from "entities/bet/model"

interface MatchItemProps {
  match: Match
}

export const MatchItem = ({ match }: MatchItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenBets, setIsOpenBets] = useState(false)
  const { bets } = useBets(match.id, isOpenBets)

  const handleArrowClick = () => {
    if (isOpen) {
      setIsOpenBets(false)
      setIsOpen(false)
      return
    }
    setIsOpen(true)
  }

  return (
    <Card className={styles.item} as="li">
      <div className={styles.itemWrapper}>
        <div className={styles.itemContent}>
          <div
            className={classNames(styles.itemInfo, { [styles.isOpen]: isOpen })}
          >
            <span className={styles.itemInfoTitle}>{match.title}</span>
            <span className={styles.itemInfoDate}>
              {moment(match.start_at).format("DD/MM/YYYY hh:mm")}
            </span>
            <button
              onClick={() => setIsOpenBets(!isOpenBets)}
              className={classNames(styles.itemInfoLink, {
                [styles.isOpen]: isOpen,
              })}
            >
              {!isOpenBets ? "Show bets" : "Hide bets"}
            </button>
          </div>
          {Object.entries(match.markets).map(
            ([key, marketsVariants], indexRow) => (
              <ul className={styles.itemMarkets} key={indexRow}>
                {marketsVariants.map((market, index) => (
                  <AddBet
                    key={`${key}_${index}`}
                    match={match}
                    market={market}
                    isOpen={isOpen}
                  />
                ))}
              </ul>
            )
          )}
        </div>
        <div
          onClick={handleArrowClick}
          className={classNames(styles.itemArrow, {
            [styles.isOpen]: isOpen,
          })}
        >
          <IoArrowDown fontSize={20} />
        </div>
      </div>
      {isOpenBets && <BetsList bets={bets} />}
    </Card>
  )
}
