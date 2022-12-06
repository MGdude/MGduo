package com.Music.Group.Repository;

import com.Music.Group.Domain.Filter;
import com.Music.Group.Domain.Music;
import com.Music.Group.Domain.SelectOption;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MusicRepository {
    public List<SelectOption> getCategoryOptions() throws Exception;
    public List<SelectOption> getGenderOptions() throws Exception;
    public List<SelectOption> getGenreOptions() throws Exception;
    public List<SelectOption> getSeasonOptions() throws Exception;

    public int musicAdd(Music music) throws Exception;

    public List<Music> getMusicList(Filter filter) throws Exception;
    public List<Music> getMusicTypeList(String type, String value) throws Exception;

    public Music getMusicPost(int musicId) throws Exception;
    public int musicUpdate(Music music) throws Exception;
    public int musicDelete(int musicId) throws Exception;

    public int musicLikeState(int musicId, String username) throws Exception;
    public int musicLikeCount(int musicId) throws Exception;
    public int musicLike(int musicId, String username) throws Exception;
    public int musicDisLike(int musicId, String username) throws Exception;
}
