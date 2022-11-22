package com.Music.Group.Repository;

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

    public List<Music> getMusicList() throws Exception;
    public List<Music> getMusicTypeList(String type, String value) throws Exception;
}
