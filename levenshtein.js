function generic_prep_dist(str1, str2) {
    if(typeof(str1) !== 'string' || typeof(str2) !== 'string') {
        throw 'two input parameters must be string';
    }

    if(str1.length === 0) {
        return str2.length;
    }
    if(str2.length === 0) {
        return str1.length;
    }

    if(str1 === str2) {
        return 0;
    }

    return -1;
}
function levenshtein(str1, str2) {
    let pre_process = generic_prep_dist(str1, str2);
    if(pre_process >= 0) return pre_process;

    // need one more space than the length
    const dp_len = str2.length+1;
    let prev_dp = Array(dp_len).fill(0);
    let curr_dp = Array(dp_len).fill(0);
    let temp_dp = null;

    for(let x=1; x < dp_len; ++x) {
        prev_dp[x] = x;
    }

    for(let i=1; i < str1.length+1; ++i) {
        curr_dp[0] = i;

        for(let j=1; j < dp_len; ++j) {
            let diagonal_cost = 1;
            if(str1.charAt(i) === str2.charAt(j)) {
                diagonal_cost = 0;
            }

            curr_dp[j] = Math.min(
                curr_dp[j-1] + 1, //insertion
                Math.min(
                    prev_dp[j] + 1, //deletion
                    prev_dp[j-1] + diagonal_cost //subtitution
                )
            );
        }

        //switch prev_dep and curr_dp
        temp_dp = prev_dp;
        prev_dp = curr_dp;
        curr_dp = temp_dp;
    }

    console.log(prev_dp[dp_len-1]);

    return prev_dp[dp_len-1];
}

module.exports = { levenshtein };