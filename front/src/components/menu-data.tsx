import React from 'react';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUsers, faHome, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from './font-awesome-icon';

type MenuBase = {
  key: string;
  icon?: React.ReactNode;
  title: string;
};

export type MenuItem = MenuBase & {
  linkTo: string;
  submenu?: never;
};

export type Submenu = MenuBase & {
  submenu: MenuItem[];
  linkTo?: never;
};

export const getMenu = (): Array<MenuItem | Submenu> => {
  return [
    {
      key: 'congregacao',
      icon: <FontAwesomeIcon icon={faHome} />,
      title: 'Congregação',
      submenu: [
        {
          key: 'congregacaoInformacoes',
          title: 'Informações',
          linkTo: 'congregacao-info',
        },
        {
          key: 'congregacaoEventos',
          title: 'Eventos',
          linkTo: 'congregacao-eventos',
        },
        {
          key: 'congregacaoAnuncios',
          title: 'Anúncios',
          linkTo: 'congregacao-anuncios',
        },
        {
          key: 'congregacaoRelatorios',
          title: 'Relatório serviço de campo',
          linkTo: 'congregacao-relatorios',
        },
        {
          key: 'congregacaoLocalizacao',
          title: 'Localizações',
          linkTo: 'congregacao-localizacao',
        },
        {
          key: 'congregacaoGrupos',
          title: 'Grupos',
          linkTo: 'congregacao-grupos',
        },
        {
          key: 'congregacaoFamilias',
          title: 'Famílias',
          linkTo: 'congregacao-familias',
        },
        {
          key: 'congregacaoOradores',
          title: 'Congregações vizinhas e oradores',
          linkTo: 'congregacao-oradores',
        },
        {
          key: 'congregacaoAssistencia',
          title: 'Assistência às reuniões',
          linkTo: 'congregacao-assistencia',
        },
        {
          key: 'congregacaoDesignacoes',
          title: 'Designações na congregação',
          linkTo: 'congregacao-designacoes',
        },
        {
          key: 'congregacaoTerritorio',
          title: 'Registros de território',
          linkTo: 'congregacao-territorio',
        },
      ],
    },
    {
      key: 'publicadores',
      icon: <FontAwesomeIcon icon={faUsers} />,
      title: 'Membros',
      linkTo: 'publicadores',
    },
    {
      key: 'programar',
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      title: 'Programar',
      submenu: [
        {
          key: 'programarVidaMinisterio',
          title: 'Reunião Vida e Ministério',
          linkTo: 'programar-vida-ministerio',
        },
        {
          key: 'programarDiscursoLocal',
          title: 'Discurso público - local',
          linkTo: 'programar-discurso-local',
        },
        {
          key: 'programarDiscursoFora',
          title: 'Discurso público - fora',
          linkTo: 'programar-discurso-fora',
        },
        {
          key: 'programarCampo',
          title: 'Serviço de campo',
          linkTo: 'programar-campo',
        },
        {
          key: 'programarResponsabilidades',
          title: 'Responsabilidades',
          linkTo: 'programar-responsabilidades',
        },
        {
          key: 'programarLimpeza',
          title: 'Limpeza',
          linkTo: 'programar-limpeza',
        },
        {
          key: 'programarJardim',
          title: 'Jardim',
          linkTo: 'programar-jardim',
        },
        {
          key: 'programarVisita',
          title: 'Visita superintendente de circuito',
          linkTo: 'programar-visita',
        },
      ],
    },
    {
      key: 'impressoes',
      title: 'Impressões',
      icon: <FontAwesomeIcon icon={faPrint} />,
      linkTo: 'impressoes',
    },
  ];
};
