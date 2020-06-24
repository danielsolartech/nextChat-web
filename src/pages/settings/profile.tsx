import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../../data';
import Form from '../../components/forms';
import { getIcon, Link, Gender } from '../../types';
import Select from '../../components/forms/select';
import { sendPatch } from '../../utils/routes';
import { setHeaderMessage, setAuthUser } from '../../data/actions/general';

const ProfileSettings: React.FC = () => {
  const general = useSelector((state: Reducers) => state.general);
  const [profileUsername, setProfileUsername] = React.useState<string>('');
  const [profileUsernameMessage, setProfileUsernameMessage] = React.useState<string>('');
  const [profileBiography, setProfileBiography] = React.useState<string>('');
  const [profileBiographyMessage, setProfileBiographyMessage] = React.useState<string>('');
  const [links, setLinks] = React.useState<Link[]>([]);
  const [linkSelected, setLinkSelected] = React.useState<string>('facebook');
  const [linkUsername, setLinkUsername] = React.useState<string>('');
  const [profileGender, setProfileGender] = React.useState<Gender>(Gender.UNKNOWN);
  const [changed, setChanged] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  if (!general.auth_user) {
    return null;
  }

  if (!checked) {
    setProfileUsername(general.auth_user.username);
    setProfileBiography(general.auth_user.biography);
    setLinks(general.auth_user.links || []);
    setProfileGender(general.auth_user.gender);
    setChecked(true);

    return null;
  }

  const addNewLink = (): void => {
    if (linkUsername.length && linkSelected.length && general.auth_user) {
      setLinks(links.concat({
        name: linkSelected,
        link: linkUsername,
      }));

      setLinkSelected('facebook');
      setLinkUsername('');
      setChanged(true);
    }
  };

  const sendForm = async (): Promise<void> => {
    try {
      setProfileUsernameMessage('');
      setProfileBiographyMessage('');

      const data: any = await sendPatch('users/settings/profile', {
        username: profileUsername,
        biography: profileBiography,
        links,
        gender: profileGender === Gender.FEMALE ? 'F' : profileGender === Gender.MALE ? 'M' : 'U',
      });

      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);

      if (data.status === true) {
        let message: string = 'Changes saved correctly.';
        if (general.auth_user?.username !== profileUsername) {
          message += 'Remember you only can change your username every 14 days.';
        }

        dispatch(setAuthUser(data.user));
        dispatch(setHeaderMessage({
          message,
          color: 'Green',
          left_time: '4',
        }));

        return;
      } else {
        const [type, message] = data.message.split('||');
        if (type === 'username' || type === 'links') {
          setProfileUsernameMessage(message);
        } else if (type === 'biography') {
          setProfileBiographyMessage(message);
        } else {
          setProfileUsernameMessage(type);
        }

        return;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  };

  return (
    <Form
      title="Edit your profile"
      inputs={[
        {
          name: 'profileUsername',
          type: 'text',
          icon: 'fas fa-user',
          label: 'Username',
          placeholder: 'Example: nextChat',
          message: profileUsernameMessage,
          defaultValue: profileUsername,
          onEnter: () => changed && sendForm(),
          onChange: (value) => {
            setProfileUsername(value);
            setChanged(general.auth_user ? general.auth_user.username !== profileUsername : false);
          },
        },
        {
          name: 'profileBiography',
          type: 'textarea',
          label: 'Biography',
          placeholder: 'Write about you',
          message: profileBiographyMessage,
          defaultValue: profileBiography,
          onChange: (value) => {
            setProfileBiography(value);
            setChanged(general.auth_user ? general.auth_user.biography !== profileBiography : false);
          },
        },
        <ul className="content-links" key={'profile_links_form'}>
          <div className="links-title">
            Links
          </div>
          {links.length > 0 && links.map((link, i) => (
            <li key={`${link.name}_${link.link}`}>
              <div className="icon">
                <i className={getIcon(link)} />
              </div>
              <span>
                {link.link}
              </span>
              <div className="icon-delete" onClick={() => {
                setLinks(links.slice(0, i).concat(links.slice(i + 1, links.length)));
                setChanged(true);
              }}>
                <i className="fas fa-trash" />
              </div>
            </li>
          ))}
          <div className="links-add">
            <div className="add-select">
              <Select
                name="linksSelect"
                defaultOption={linkSelected}
                options={[
                  {
                    value: 'facebook',
                    label: 'Facebook',
                    icon: 'fab fa-facebook-f',
                  },
                  {
                    value: 'twitter',
                    label: 'Twitter',
                    icon: 'fab fa-twitter',
                  },
                  {
                    value: 'whatsapp',
                    label: 'Whatsapp',
                    icon: 'fab fa-whatsapp',
                  },
                  {
                    value: 'instagram',
                    label: 'Instagram',
                    icon: 'fab fa-instagram',
                  },
                  {
                    value: 'github',
                    label: 'GitHub',
                    icon: 'fab fa-github',
                  },
                ]}
                onChange={(option) => setLinkSelected(option.value)}
              />
            </div>
            <div className="add-link">
              <input type="text" placeholder="Username" value={linkUsername} onChange={(e) => setLinkUsername(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && addNewLink()} />
              <div className="icon background-hover" background-color="Purple" text-color="White" onClick={() => addNewLink()}>
                <i className="fas fa-plus" />
              </div>
            </div>
          </div>
        </ul>,
        {
          name: 'profileGender',
          type: 'radio',
          label: 'Gender',
          description: 'If you do not sure of what are you, so choose \'Other\' or you can choose the other options.',
          defaultChecked: profileGender === Gender.FEMALE ? 'femaleGender' : profileGender === Gender.MALE ? 'maleGender' : 'otherGender',
          options: [
            {
              name: 'femaleGender',
              value: 'F',
              label: 'Female',
              className: 'gender',
            },
            {
              name: 'maleGender',
              value: 'M',
              label: 'Male',
              className: 'gender',
            },
            {
              name: 'otherGender',
              value: 'U',
              label: 'Other',
              className: 'gender',
            },
          ],
          onChange: (value) => {
            setProfileGender(value === 'F' ? Gender.FEMALE : value === 'M' ? Gender.MALE : Gender.UNKNOWN);
            setChanged(general.auth_user ? general.auth_user.gender !== profileGender : false);
          },
        },
      ]}
      submitButton={{
        name: 'saveProfile',
        type: 'background',
        color: 'Purple',
        hoverColor: 'DEFAULT',
        text: 'Save changes',
        as: 'Button',
        extraProps: {
          'text-color': 'White',
        },
        onClick: () => changed && sendForm(),
      }}
    />
  );
};

export default ProfileSettings;
