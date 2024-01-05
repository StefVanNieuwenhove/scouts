import { AxiosError } from 'axios';
import { axios } from '.';
import { Member, MemberForm } from '../types';

export const getMembers = async (): Promise<Member[]> => {
  try {
    const members = await axios.get('member', { withCredentials: true });
    return members.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getMember = async (id: string): Promise<Member> => {
  try {
    const member = await axios.get(`member/${id}`, { withCredentials: true });
    return member.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getMembersByGroup = async (tak: string): Promise<Member[]> => {
  try {
    const members = await axios.get(`member/tak/${tak}`, {
      withCredentials: true,
    });
    return members.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getRolesOfMembers = async (): Promise<string[]> => {
  try {
    const takken = await axios.get('member/roles', { withCredentials: true });
    return takken.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const createMember = async (member: MemberForm): Promise<Member> => {
  try {
    console.log(member);
    const newMember = await axios.post('member', member, {
      withCredentials: true,
    });
    return newMember.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const deleteMember = async (id: string): Promise<void> => {
  try {
    await axios.delete(`member/${id}`, { withCredentials: true });
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
