import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { positionAction } from 'src/reducers/position/action';

const Label: React.FC = ({ children }) => {
  return <div className="font-lato-bold fhd:text-18">{children}</div>;
};

const Group: React.FC = ({ children }) => {
  return <section className="flex flex-col">{children}</section>;
};

const Span: React.FC = ({ children }) => {
  return <span className="text-14">{children}</span>;
};

export const ProfilePosition: React.FC = React.memo(() => {
  const position = useAppSelector((state) => state.position.position);
  const profile = useAppSelector((state) => state.auth.myProfile)!;
  const dispatch = useAppDispatch();
  const profileJurisdiction = useMemo(() => {
    const found = position.find((f) => f.id === profile?.position);
    if (found) {
      return found.position;
    }
    return 'N/A';
  }, [position]);

  useEffect(() => {
    if (typeof profile.race === 'object') {
      dispatch(positionAction.getPositions(profile.race.id));
    }
  }, []);
  return profile ? (
    <section className="text-white flex flex-col gap-y-15 mt-50">
      <Group>
        <Label>Government Level</Label>
        <Span>{profile.government_level?.title}</Span>
      </Group>
      {!profile.race ? (
        <Group>
          <Label>Description</Label>
          <Span>{profile.race_jurisdiction_request}</Span>
        </Group>
      ) : (
        <>
          <Group>
            <Label>Race</Label>
            <Span>{profile.race?.title}</Span>
          </Group>
          <Group>
            <Label>Jurisdiction</Label>
            <Span>{profileJurisdiction}</Span>
          </Group>
        </>
      )}
    </section>
  ) : null;
});
