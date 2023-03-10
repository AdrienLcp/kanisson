import type { FC } from 'react';
import type { MyPlaylistCardProps } from '../../../types/components/cards';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { myPlaylistCard } from '../../../translations/components/cards';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import { MyPlaylistCardView } from './view';
import { Loader } from '../../Loader/Loader';
import { UserContext } from '../../../contexts/UserContext';

export const MyPlaylistsCard: FC<MyPlaylistCardProps> = ({
  playlist,
  playlists,
  setPlaylists,
  setWarningMessage,
  setValidMessage
}) => {

  const { user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];
  const notAuthorized = messages.authorization[lang as keyof typeof messages.authorization];
  const playlistDeleted = myPlaylistCard.playlistDeleted[lang as keyof typeof myPlaylistCard.playlistDeleted];

  const [loading, setLoading] = useState<boolean>(false);

  const deletePlaylist = async() => {
    // Show loader & get token from local storage for authorization
    setLoading(true);
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      playlist_id: playlist.id
    };

    // Delete playlist from database
    await fetch(`${api}/playlist/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        // Remove right playlist from state & update it
        const previousPlaylists = [...playlists];
        const index = previousPlaylists.indexOf(playlist);
        previousPlaylists.splice(index, 1);
        setPlaylists(previousPlaylists);

        // Set message to inform user
        setValidMessage(playlistDeleted);
      } else {
        console.log(data);
        setWarningMessage(notAuthorized);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(errorMessage);
    });

    // Hide loader
    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <MyPlaylistCardView
      playlist={playlist}
      deletePlaylist={deletePlaylist}
    />
  );
};