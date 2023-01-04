import style from 'styled-components'
import Panel from '../../assets/media/images/corner-panel.png'
import PanelRight from '../../assets/media/images/corner-panel-right.png'

const PageWrapper = style.section `
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Sections = style.div `
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Left = style(Sections)`
  width: 50%;
  background: #F4F4F4;
  padding: 0 3%;
  background-image: url(${Panel});
  background-repeat: no-repeat;
  background-position: bottom left;
  @media (max-width: 768px) {
    width: calc(100% - 7.4%);
    display: none;
  }
`

const Rigth = style(Sections)`
  width: 50%;
  background: #F9F9F9;
  padding: 0 13%;
  align-items: flex-start;
  background-image: url(${PanelRight});
  background-repeat: no-repeat;
  background-position: top right;
  @media (max-width: 768px) {
    width: calc(100% - 26%);
  }
`

const Img = style.img `
  width: ${props => props.sizes ? props.sizes : '100%'};
`

const Title = style.h1 `
  font-size: 40px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.05em;
`

const Subtitle = style.h2 `
  color: #6D7580;
  font-size: 20px;
  letter-spacing: -0.05em;
  font-weight: 400;
  margin-bottom: 52px;
`

export {
  PageWrapper,
  Left,
  Rigth,
  Img,
  Title,
  Subtitle
}