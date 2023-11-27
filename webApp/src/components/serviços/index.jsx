import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAgendamento, filterAgenda, updateClub } from '../../store/modules/salao/actions';
import moment from 'moment';

const EXPO_PUBLIC_BUCKET = import.meta.env.VITE_USER_BUCKET_URL;

export default function Servicos(props) {

  const dispatch = useDispatch();

  const Navigation = useNavigate();

  const servicos = props.servicos;

  const isLisboaClubPage = props.currentPage === 'LisboaClub';

  const breakTitleIntoTwoLines = (title) => {
    const maxLength = 14;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}\n${title.substring(maxLength)}`;
    }
    return title;
  };

  return (
    <div className="container">
        <h1>Nossos Serviços</h1>
      {servicos?.map((servico, index) => (
        <div key={index} className="buttonServico">
          <button
            onClick={() => {
              dispatch(updateAgendamento({ servicoId: servico._id }));
              dispatch(filterAgenda());
              isLisboaClubPage
                ? dispatch(updateClub(true)) && Navigation('Home') : null;
            }}
          >
            <div className="d-inline-flex imageContainer">
              <img
                src={`${EXPO_PUBLIC_BUCKET}/${servico?.arquivos[0]?.caminho}`}
                alt="logo"
                className="rounded-circle service-image"
              />
            </div>
            <div className="titleContainer">
              <p className="title">
                {isLisboaClubPage
                  ? breakTitleIntoTwoLines(servico.nome + ' Club')
                  : breakTitleIntoTwoLines(servico.nome)}
                <br />
              </p>
            </div>
            <div className="descriptionContainer">
              <p className="description">
                {isLisboaClubPage
                  ? moment(servico.duracao).format('HH:mm')
                  : `R$ ${servico.valor} • ${moment(servico.duracao).format('HH:mm')}`}
              </p>
            </div>
          </button>
          <div
            onClick={() => {
              dispatch(updateAgendamento({ servicoId: servico._id }));
              dispatch(filterAgenda());
              isLisboaClubPage
                ? dispatch(updateClub(true)) && Navigation('Home') : null;
              
            }}
            className={isLisboaClubPage ? 'buttonAgendamentoLisboa' : 'buttonAgendamento'}
          >
            <p className={isLisboaClubPage ? 'buttonTextLisboa' : 'buttonText'}>
              Agendar
            </p>
            <i
              className="material-icons"
              style={{ color: isLisboaClubPage ? '#FDB02F' : '#fff' }}
            >
              calendar-blank
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}

Servicos.propTypes = {
  servicos: Proptypes.array,
  currentPage: Proptypes.string,
};
