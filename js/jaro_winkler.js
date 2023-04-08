function jaro(str1, str2) { //similarity function, different from distance function
    if(str1 === str2) return 1.0

    let len1 = str1.length;
    let len2 = str2.length;

    if (len1 == 0 || len2 == 0)
        return 0.0;

    let max_dist = Math.floor(Math.max(len1,len2) / 2) - 1;
    let num_match = 0;

    let has_matched_1 = Array(len1).fill(false);
    let matched_index_2 = Array(len2).fill(-1);

    for(let i = 0; i < len1; ++i) {
        for(let j = Math.max(0, i-max_dist);
                j < Math.min(len2, i+max_dist+1); ++j) {
                    if(str1.charAt(i) === str2.charAt(j) && matched_index_2[j] === -1) {
                        has_matched_1[i] = true;
                        matched_index_2[j] = i;
                        ++num_match;
                        break;
                    }
                }
    }

    if(num_match === 0) return 0.0;

    let tranpos = 0.0;
    let curr_idx_2 = 0;

    for(let i = 0; i < len1; ++i) {
        if(has_matched_1[i]) {
            while(curr_idx_2 < len2 && matched_index_2[curr_idx_2] != i)
                ++curr_idx_2;

            if(curr_idx_2 < len2 && i != curr_idx_2 )
                tranpos += 1.0;

            ++curr_idx_2;
        }
    }

    tranpos /= 2.0;

    return ( num_match/len1 + num_match/len2 + (num_match-tranpos)/num_match ) / 3.0;
}
function jaro_wrinkler(str1, str2, threshold) {
    let jaro_dist = jaro(str1, str2);

    console.log(jaro_dist);

    if(jaro_dist <= threshold) return jaro_dist;

    let len1 = str1.length;
    let len2 = str2.length;
    let prefix_len = 0;
    for(let i = 0; i < Math.min(len1, len2); ++i) {
        if(str1.charAt(i) === str2.charAt(i))
            ++prefix_len;
        else
            break;
    }

    prefix_len = Math.min(prefix_len, 4);

    return jaro_dist + 0.1*prefix_len*(1 - jaro_dist)
}

module.exports = { jaro_wrinkler };