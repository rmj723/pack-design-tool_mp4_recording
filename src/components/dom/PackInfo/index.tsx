import useStore from '@/lib/store'
import TextFromBottom from '../AnimatedText/TextFromBottom'
import s from './PuckInfo.module.scss'

export default function PuckIntroUI({ pucks }) {
  const [tier1enter, tier2enter, tier3enter, introDone] = useStore((s) => [
    s.tier1enter,
    s.tier2enter,
    s.tier3enter,
    s.introDone,
  ])
  const tier3 = pucks.filter((puck) => puck.tier === 3)
  const tier2 = pucks.filter((puck) => puck.tier === 2)
  const tier1 = pucks.filter((puck) => puck.tier === 1)
  return (
    <div className='puck-intro-ui'>
      <div className='absolute top-0 left-0 pt-8 pl-8 top-left-header'>
        <h1 className='text-50'>Your Highlights</h1>
        {/* <div
          style={{
            opacity: showLable ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
          className='absolute uppercase text-27 bottom-8 left-[50%] translate-x-[-50%]'>
          rarity: {activeTier}
        </div> */}
        <div className='raritys'>
          {tier3enter || introDone ? (
            <TextFromBottom delay={0.5} duration={0.75}>
              <span className={s.lable}>
                <span className={s.lableTier3}>Core LE</span> x{tier3.length}
              </span>
            </TextFromBottom>
          ) : null}
          {tier2enter || introDone ? (
            <TextFromBottom delay={0.5} duration={0.75}>
              <span className={s.lable}>
                <span className={s.lableTier2}>Legendery</span> x{tier2.length}
              </span>
            </TextFromBottom>
          ) : null}
          {tier1enter || introDone ? (
            <TextFromBottom delay={0.5} duration={0.75}>
              <span className={s.lable}>
                <span className={s.lableTier1}>Epic</span> x{tier1.length}
              </span>
            </TextFromBottom>
          ) : null}
        </div>
      </div>
      {!introDone && (
        <button
          className='absolute bottom-14 left-[50%] translate-x-[-50%]'
          onClick={() => {
            useStore.setState({ tier1done: true, tier2done: true, tier3done: true })
          }}>
          SKIP INTRO
        </button>
      )}
    </div>
  )
}
